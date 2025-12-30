import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Permission } from '../../../common/enums/permission.enum';
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

  @Column({
    type: 'simple-array',
    default: '',
  })
  public permissions: Permission[];

  @Column({ nullable: true })
  public diveraAccessKey: string;

  @Column({ nullable: true, select: false })
  public refreshToken: string;

  constructor() {
    this.id = new UserId();
    this.permissions = [];
  }
}
