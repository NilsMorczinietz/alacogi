import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Permission } from '../../common/enums/permission.enum';
import { UserId } from '../user/entity/user-id';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
    });
  }

  public async validate(payload: {
    sub: string;
    email: string;
    permissions: Permission[];
  }): Promise<User> {
    const userId = new UserId(payload.sub);
    const user = await this.authService.validateUser(userId);
    if (user === null) {
      throw new UnauthorizedException();
    }
    // Permissions aus dem JWT Token nutzen (performant)
    user.permissions = payload.permissions || [];
    return user;
  }
}
