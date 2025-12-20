import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { Permission } from '../../common/enums/permission.enum';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserGetDto } from './dto/user-get.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.USER_READ)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Alle Benutzer abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Benutzer', type: [UserGetDto] })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  @ApiResponse({ status: 403, description: 'Fehlende Berechtigung' })
  public async findAll(): Promise<UserGetDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => ({
      id: user.id.getId(),
      name: user.name,
      email: user.email,
      permissions: user.permissions ?? [],
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Eigenes Benutzerprofil abrufen' })
  @ApiResponse({ status: 200, description: 'Profil erfolgreich abgerufen', type: UserGetDto })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  public getProfile(@Request() req: { user: User }): UserGetDto {
    const user = req.user;
    return {
      id: user.id.getId(),
      name: user.name,
      email: user.email,
      permissions: user.permissions ?? [],
    };
  }
}
