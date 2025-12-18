import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserGetDto } from './dto/user-get.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Alle Benutzer abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Benutzer', type: [UserGetDto] })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  public async findAll(): Promise<UserGetDto[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Eigenes Benutzerprofil abrufen' })
  @ApiResponse({ status: 200, description: 'Profil erfolgreich abgerufen', type: UserGetDto })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  public getProfile(@Request() req: { user: UserGetDto }): UserGetDto {
    return req.user;
  }
}
