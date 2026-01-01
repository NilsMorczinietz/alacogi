import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Address } from '../../../common/address';
import { AddressTransformer } from '../../../common/address.transformer';
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

  @Column({ unique: true })
  public foreignId: string;

  @Column()
  public authorId: number;

  @Column()
  public title: string;

  @Column('text')
  public text: string;

  @Column({
    type: 'jsonb',
    transformer: new AddressTransformer(),
    nullable: true,
  })
  public address: Address | null;

  @Column('text', { nullable: true })
  public reporter: string | null;

  @Column('text', { nullable: true })
  public remarks: string | null;

  @Column('decimal', { precision: 10, scale: 8 })
  public lat: number;

  @Column('decimal', { precision: 11, scale: 8 })
  public lng: number;

  @Column()
  public priority: boolean;

  @Column('timestamptz')
  public date: Date;

  constructor() {
    this.id = new AlarmId();
  }
}
