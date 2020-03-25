import bcrypt from 'bcryptjs';
import { Entity, Column, Index, BeforeInsert, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';
import config from '../config/configuration';
import { Post } from '../posts/post.entity';

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

  @OneToMany(
    () => Post,
    post => post.user,
  )
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Field(() => String)
  get token() {
    const payload = { id: this.id, username: this.username };
    return jwt.sign(payload, config.auth.secretKey, {
      expiresIn: '5d',
    });
  }
}
