import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGetDto } from '../user/dto/user-get.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Aktuelles Benutzerprofil abrufen' })
  @ApiResponse({ status: 200, description: 'Profil erfolgreich abgerufen', type: UserGetDto })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  public getProfile(@Request() req: { user: UserGetDto }): UserGetDto {
    return req.user;
  }
}
