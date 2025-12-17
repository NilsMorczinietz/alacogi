import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmId } from './entity/alarm-id';
import { Alarm } from './entity/alarm.entity';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
  ) {}

  public findAll(): Promise<Alarm[]> {
    return this.alarmRepository.find();
  }

  public findById(id: AlarmId): Promise<Alarm | null> {
    return this.alarmRepository.findOne({ where: { id } });
  }

  public async announce(): Promise<void> {
    // Implementation for announcing an alarm goes here
    // This could involve sending notifications, logging, etc.
  }
}
