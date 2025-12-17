import { Entity, Column, PrimaryColumn } from 'typeorm';
import { UserId } from './user-id';
import { UserIdTransformer } from './user-id.transformer';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'uuid',
    transformer: new UserIdTransformer(),
  })
  public id: UserId;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  constructor() {
    this.id = new UserId();
  }
}
