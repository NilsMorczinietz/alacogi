import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiveraService } from '../divera/divera.service';
import { EventsGateway } from '../events/events.gateway';
import { AlarmId } from './entity/alarm-id';
import { Alarm } from './entity/alarm.entity';

@Injectable()
export class AlarmService {
  private readonly logger = new Logger(AlarmService.name);

  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
    private diveraService: DiveraService,
    private eventsGateway: EventsGateway,
  ) {}

  public findAll(): Promise<Alarm[]> {
    return this.alarmRepository.find();
  }

  public findById(id: AlarmId): Promise<Alarm | null> {
    return this.alarmRepository.findOne({ where: { id } });
  }

  public async announce(): Promise<void> {
    try {
      this.logger.log('Alarm announce triggered - fetching latest alarm from Divera');

      // Letzten Alarm von Divera API abrufen
      const alarmsData = await this.diveraService.getAlarms();

      // Überprüfen ob Alarme vorhanden sind
      if (!alarmsData.sorting || alarmsData.sorting.length === 0) {
        this.logger.warn('No alarms found in Divera response');
        return;
      }

      // Letzten Alarm aus der sortierten Liste holen
      const latestAlarmId = alarmsData.sorting[0];
      const latestAlarm = alarmsData.items[latestAlarmId];

      if (!latestAlarm) {
        this.logger.warn(`Latest alarm with ID ${latestAlarmId} not found in items`);
        return;
      }

      this.logger.log(`Broadcasting latest alarm (ID: ${latestAlarm.id}) to all connected clients`);

      // Alarm an alle verbundenen WebSocket-Clients senden
      this.eventsGateway.broadcast('alarm', {
        id: latestAlarm.id,
        title: latestAlarm.title,
        text: latestAlarm.text,
        address: latestAlarm.address,
        lat: latestAlarm.lat,
        lng: latestAlarm.lng,
        priority: latestAlarm.priority,
        date: latestAlarm.date,
        closed: latestAlarm.closed,
        new: latestAlarm.new,
        foreign_id: latestAlarm.foreign_id,
        ts_create: latestAlarm.ts_create,
        ts_update: latestAlarm.ts_update,
      });

      this.logger.log('Alarm broadcast completed successfully');
    } catch (error) {
      this.logger.error('Failed to announce alarm', error);
      throw error;
    }
  }
}
