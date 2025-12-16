import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserGetDto } from 'src/user/dto/user-get.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Neuen Benutzer registrieren' })
  @ApiResponse({ status: 201, description: 'Registrierung erfolgreich', type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'Email bereits registriert' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Benutzer einloggen' })
  @ApiResponse({ status: 200, description: 'Login erfolgreich', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Ungültige Anmeldedaten' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Aktuelles Benutzerprofil abrufen' })
  @ApiResponse({ status: 200, description: 'Profil erfolgreich abgerufen', type: UserGetDto })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  getProfile(@Request() req): UserGetDto {
    return req.user;
  }
}
