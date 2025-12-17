import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AlarmId } from './alarm-id';
import { AlarmIdTransformer } from './alarm-id.transformer';

@Entity()
export class Alarm {
  @PrimaryColumn({
    type: 'uuid',
    transformer: new AlarmIdTransformer(),
  })
  public id: AlarmId;

  @Column({ unique: true })
  public diveraId: number;

  constructor() {
    this.id = new AlarmId();
  }
}
