import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Neuen Benutzer registrieren' })
  @ApiResponse({ status: 201, description: 'Registrierung erfolgreich', type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'Email bereits registriert' })
  public async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Benutzer einloggen' })
  @ApiResponse({ status: 200, description: 'Login erfolgreich', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Ungültige Anmeldedaten' })
  public async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Access Token erneuern' })
  @ApiResponse({ status: 200, description: 'Token erfolgreich erneuert' })
  @ApiResponse({ status: 401, description: 'Ungültiger Refresh Token' })
  public async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }
}
