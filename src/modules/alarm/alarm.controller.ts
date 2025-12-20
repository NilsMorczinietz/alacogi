import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { Permission } from '../../common/enums/permission.enum';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AlarmService } from './alarm.service';

@ApiTags('alarms')
@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ALARM_ANNOUNCE)
  @Post('announce')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Benachrichtigung über neuen Alarm senden' })
  @ApiResponse({ status: 204, description: 'Benachrichtigung erfolgreich versendet' })
  @ApiResponse({ status: 401, description: 'Nicht authentifiziert' })
  @ApiResponse({ status: 403, description: 'Fehlende Berechtigung' })
  public async announce(): Promise<void> {
    await this.alarmService.announce();
  }
}
