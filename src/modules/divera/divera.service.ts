import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { DIVERA_CONFIG, DIVERA_ENDPOINTS } from './constants/divera.constants';
import { DiveraAlarmDto, DiveraAlarmsListDto } from './dto/divera-alarm.dto';
import {
  DiveraAlarmsResponse,
  DiveraApiResponse,
} from './interfaces/divera-api-response.interface';

@Injectable()
export class DiveraService {
  private readonly logger = new Logger(DiveraService.name);
  private readonly baseUrl: string;
  private readonly accessKey: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = DIVERA_CONFIG.BASE_URL;
    this.accessKey = process.env.DIVERA_ACCESS_KEY || '';
  }

  async getAlarms(): Promise<DiveraAlarmsListDto> {
    try {
      const url = `${this.baseUrl}${DIVERA_ENDPOINTS.ALARMS}`;

      const response = await firstValueFrom(
        this.httpService.get<DiveraApiResponse<DiveraAlarmsResponse>>(url, {
          params: { accesskey: this.accessKey },
        }),
      );

      if (!response.data.success) {
        throw new Error('Divera API returned unsuccessful response');
      }

      const { items, sorting } = response.data.data;
      const mappedItems: Record<string, DiveraAlarmDto> = {};

      Object.entries(items).forEach(([key, alarm]) => {
        mappedItems[key] = new DiveraAlarmDto(alarm);
      });

      return new DiveraAlarmsListDto(mappedItems, sorting);
    } catch (error) {
      this.logger.error('Failed to fetch alarms from Divera API', error);
      throw error;
    }
  }
}
