import bcrypt from 'bcryptjs';
import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User extends Base {
  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  @Index({ unique: true })
  username: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
