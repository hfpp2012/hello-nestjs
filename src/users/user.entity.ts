import { Entity, Column, Index } from 'typeorm';
import { Base } from '../shared/base.entity';

@Entity('users')
export class User extends Base {
  @Column()
  email: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column('text')
  password: string;
}
