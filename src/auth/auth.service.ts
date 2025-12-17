import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserId } from '../modules/user/entity/user-id';
import { User } from '../modules/user/entity/user.entity';
import { UserService } from '../modules/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

    // Generate token
    const token = this.generateToken(user);

    return {
      access_token: token,
      user: {
        email: user.email,
        name: user.name,
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

    // Generate token
    const token = this.generateToken(user);

    return {
      access_token: token,
      user: { email, name: user.name },
    };
  }

  public async validateUser(userId: UserId): Promise<User | null> {
    return this.userService.findById(userId);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id.getId(), email: user.email };
    return this.jwtService.sign(payload);
  }
}
