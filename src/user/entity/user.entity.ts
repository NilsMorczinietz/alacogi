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

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  constructor() {
    this.id = new UserId();
  }
}
