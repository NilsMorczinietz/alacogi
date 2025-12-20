import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiveraService } from '../divera/divera.service';
import { AlarmId } from './entity/alarm-id';
import { Alarm } from './entity/alarm.entity';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
    private diveraService: DiveraService,
  ) {}

  public findAll(): Promise<Alarm[]> {
    return this.alarmRepository.find();
  }

  public findById(id: AlarmId): Promise<Alarm | null> {
    return this.alarmRepository.findOne({ where: { id } });
  }

  public async announce(): Promise<void> {
    // const result = await this.diveraService.getAlarms();
    // Implementation for announcing an alarm goes here
  }
}
