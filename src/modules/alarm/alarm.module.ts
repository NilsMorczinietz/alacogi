import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveraModule } from '../divera/divera.module';
import { EventsModule } from '../events/events.module';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { Alarm } from './entity/alarm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alarm]), DiveraModule, EventsModule],
  controllers: [AlarmController],
  providers: [AlarmService],
  exports: [AlarmService],
})
export class AlarmModule {}
