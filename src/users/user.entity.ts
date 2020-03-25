import bcrypt from 'bcryptjs';
import { Entity, Column, Index, BeforeInsert } from 'typeorm';
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
