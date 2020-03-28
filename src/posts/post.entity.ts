import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@Entity('posts')
@ObjectType()
export class Post extends Base {
  @Column('text')
  @Field()
  body: string;

  @ManyToOne(
    () => User,
    user => user.posts,
    { eager: true },
  )
  @Field(() => User)
  user: User;
}
