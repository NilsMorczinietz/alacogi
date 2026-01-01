import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unixToGermanDate } from '../../common/utils/date.util';
import { DiveraService } from '../divera/divera.service';
import { DiveraAlarmDto } from '../divera/dto/divera-alarm.dto';
import { EventsGateway } from '../events/events.gateway';
import { AlarmTextParser } from './alarm-text.parser';
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

  /**
   * Process announce from Divera: fetch alarms, save to DB, and broadcast via WebSocket
   */
  public async announce(): Promise<void> {
    try {
      this.logger.log('Alarm announce triggered - fetching alarms from Divera');

      // Fetch alarms list from Divera API
      const alarmsData = await this.diveraService.getAlarms();

      // Check if alarms are present
      if (!alarmsData.sorting || alarmsData.sorting.length === 0) {
        this.logger.warn('No alarms found in Divera response');
        return;
      }

      this.logger.log(`Processing ${alarmsData.sorting.length} alarm(s) from Divera`);

      // Process each alarm in the list
      const processedAlarms: Alarm[] = [];

      for (const alarmId of alarmsData.sorting) {
        const diveraAlarm = alarmsData.items[alarmId];

        if (!diveraAlarm) {
          this.logger.warn(`Alarm with ID ${alarmId} not found in items`);
          continue;
        }

        try {
          // Transform and save alarm
          const alarm = await this.processAndSaveAlarm(diveraAlarm);
          if (alarm) {
            processedAlarms.push(alarm);
          }
        } catch (error) {
          this.logger.error(`Failed to process alarm ${alarmId}`, error);
          // Continue processing other alarms
        }
      }

      // Broadcast all new alarms via WebSocket
      if (processedAlarms.length > 0) {
        this.logger.log(`Broadcasting ${processedAlarms.length} alarm(s) to WebSocket clients`);

        for (const alarm of processedAlarms) {
          this.broadcastAlarm(alarm);
        }
      }

      this.logger.log('Alarm announce completed successfully');
    } catch (error) {
      this.logger.error('Failed to announce alarm', error);
      throw error;
    }
  }

  /**
   * Transform Divera alarm to internal format and save to database
   * Returns null if alarm already exists (duplicate)
   */
  private async processAndSaveAlarm(diveraAlarm: DiveraAlarmDto): Promise<Alarm | null> {
    // Check if alarm already exists (by diveraId or foreignId)
    const existingAlarm = await this.alarmRepository.findOne({
      where: [{ diveraId: diveraAlarm.id }, { foreignId: diveraAlarm.foreign_id }],
    });

    if (existingAlarm) {
      this.logger.debug(`Alarm ${diveraAlarm.id} already exists in database, skipping`);
      return null;
    }

    // Parse text to extract reporter, remarks, and address
    const parsedText = AlarmTextParser.parse(diveraAlarm.text, diveraAlarm.address);

    // Create new alarm entity
    const alarm = new Alarm();
    alarm.diveraId = diveraAlarm.id;
    alarm.foreignId = diveraAlarm.foreign_id;
    alarm.authorId = diveraAlarm.author_id;
    alarm.title = diveraAlarm.title;
    alarm.text = diveraAlarm.text;

    // Use parsed address or create default one
    alarm.address = parsedText.address ?? null;
    alarm.reporter = parsedText.reporter ?? null;
    alarm.remarks = parsedText.remarks ?? null;

    alarm.lat = diveraAlarm.lat;
    alarm.lng = diveraAlarm.lng;
    alarm.priority = diveraAlarm.priority;
    alarm.date = unixToGermanDate(diveraAlarm.date);

    // Save to database
    const savedAlarm = await this.alarmRepository.save(alarm);
    this.logger.log(`Saved alarm ${savedAlarm.diveraId} (${savedAlarm.foreignId}) to database`);

    return savedAlarm;
  }

  private broadcastAlarm(alarm: Alarm): void {
    this.eventsGateway.broadcast('alarm', {
      id: alarm.id.getId(),
      diveraId: alarm.diveraId,
      foreignId: alarm.foreignId,
      title: alarm.title,
      text: alarm.text,
      address: alarm.address
        ? {
            street: alarm.address.street ?? null,
            city: alarm.address.city ?? null,
            details: alarm.address.details ?? null,
            full: alarm.address.fullAddress ?? null,
          }
        : null,
      reporter: alarm.reporter,
      remarks: alarm.remarks,
      lat: alarm.lat,
      lng: alarm.lng,
      priority: alarm.priority,
      date: alarm.date,
      createdAt: alarm.createdAt,
    });
  }
}
