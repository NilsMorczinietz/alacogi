import { Entity, Column, PrimaryColumn } from 'typeorm';
import { UserId } from './user-id';
import { UserIdTransformer } from './user-id.transformer';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'uuid',
    transformer: new UserIdTransformer(),
  })
  id: UserId;

  @Column()
  name: string;

  @Column()
  email: string;

  constructor() {
    this.id = new UserId();
  }
}
