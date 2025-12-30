import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Permission } from '../../common/enums/permission.enum';
import { UserId } from '../user/entity/user-id';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser !== null) {
      throw new ConflictException('Email bereits registriert');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user via UserService
    const user = await this.userService.createWithPassword(email, name, hashedPassword);

    // Generate tokens
    const { access_token, refresh_token } = await this.generateTokens(user);

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id.getId(),
        email: user.email,
        name: user.name,
        diveraAccessKey: user.diveraAccessKey,
        permissions: user.permissions ?? [],
      },
    };
  }

  public async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Load user with password (password is not loaded by default)
    const user = await this.userService.findByEmail(email, true);

    if (user === null) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    // Generate tokens
    const { access_token, refresh_token } = await this.generateTokens(user);

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id.getId(),
        email: user.email,
        name: user.name,
        diveraAccessKey: user.diveraAccessKey,
        permissions: user.permissions ?? [],
      },
    };
  }

  public async validateUser(userId: UserId): Promise<User | null> {
    return this.userService.findById(userId);
  }

  public async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const payload: {
        sub: string;
        email: string;
        permissions: Permission[];
      } = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get('JWT_REFRESH_SECRET') || this.configService.get('JWT_SECRET'),
      });

      const user = await this.userService.findById(new UserId(payload.sub));
      if (!user) {
        throw new UnauthorizedException('Benutzer nicht gefunden');
      }

      // Verify stored refresh token matches
      const storedRefreshToken = await this.userService.getRefreshToken(user.id);
      if (storedRefreshToken !== refreshToken) {
        throw new UnauthorizedException('Ungültiger Refresh Token');
      }

      // Generate new tokens
      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Ungültiger oder abgelaufener Refresh Token');
    }
  }

  private async generateTokens(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: user.id.getId(),
      email: user.email,
      permissions: user.permissions ?? [],
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET') || this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    // Store refresh token
    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  public async revokeRefreshToken(userId: UserId): Promise<void> {
    await this.userService.updateRefreshToken(userId, null);
  }
}
