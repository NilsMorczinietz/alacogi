import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlarmService } from './alarm.service';

@ApiTags('alarms')
@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post('announce')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Benachrichtigung über neuen Alarm senden' })
  @ApiResponse({ status: 204, description: 'Benachrichtigung erfolgreich versendet' })
  public async announce(): Promise<void> {
    await this.alarmService.announce();
  }
}
