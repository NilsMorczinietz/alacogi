import { UnauthorizedException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UserId } from '../user/entity/user-id';

interface AuthenticatedSocket extends Socket {
  userId?: UserId;
  email?: string;
}

@WebSocketGateway({
  cors: {
    origin: '*', // In Production: spezifische Origins angeben
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  private connectedClients = new Map<string, AuthenticatedSocket>();

  constructor(private authService: AuthService) {}

  public async handleConnection(client: AuthenticatedSocket): Promise<void> {
    try {
      // Token aus Query-Parameter oder Auth-Header extrahieren
      const token =
        (client.handshake.auth.token as string | undefined) ||
        (client.handshake.query.token as string | undefined);

      if (!token) {
        throw new UnauthorizedException('Kein Token bereitgestellt');
      }

      // Token validieren
      const user = await this.validateToken(token);

      // User-Daten am Socket speichern
      client.userId = user.userId;
      client.email = user.email;

      // Client registrieren
      this.connectedClients.set(client.id, client);

      // Bestätigung an Client senden
      client.emit('authenticated', {
        message: 'Erfolgreich authentifiziert',
        userId: user.userId.getId(),
        email: user.email,
      });
    } catch {
      client.emit('error', { message: 'Authentifizierung fehlgeschlagen' });
      client.disconnect();
    }
  }

  public handleDisconnect(client: AuthenticatedSocket): void {
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('refresh-token')
  public async handleRefreshToken(
    @MessageBody() data: { refresh_token: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<void> {
    try {
      const tokens = await this.authService.refreshAccessToken(data.refresh_token);

      // Neue Tokens an Client senden
      client.emit('tokens-refreshed', tokens);
    } catch {
      throw new WsException('Token-Refresh fehlgeschlagen');
    }
  }

  @SubscribeMessage('ping')
  public handlePing(@ConnectedSocket() _client: AuthenticatedSocket): string {
    return 'pong';
  }

  public sendToUser(userId: UserId, event: string, data: unknown): void {
    this.connectedClients.forEach((client) => {
      if (client.userId?.getId() === userId.getId()) {
        client.emit(event, data);
      }
    });
  }

  public broadcast(event: string, data: unknown): void {
    this.server.emit(event, data);
  }

  private async validateToken(token: string): Promise<{ userId: UserId; email: string }> {
    try {
      // JWT Token dekodieren (ohne Verifikation für schnelle Extraktion)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(Buffer.from(base64, 'base64').toString()) as {
        sub: string;
        email: string;
      };

      const userId = new UserId(payload.sub);

      // User validieren
      const user = await this.authService.validateUser(userId);

      if (!user) {
        throw new UnauthorizedException('Benutzer nicht gefunden');
      }

      return {
        userId: user.id,
        email: user.email,
      };
    } catch {
      throw new UnauthorizedException('Ungültiger Token');
    }
  }
}
