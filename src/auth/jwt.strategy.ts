import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserId } from '../modules/user/entity/user-id';
import { User } from '../modules/user/entity/user.entity';
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

  public async validate(payload: { sub: string; email: string }): Promise<User> {
    const userId = new UserId(payload.sub);
    const user = await this.authService.validateUser(userId);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
