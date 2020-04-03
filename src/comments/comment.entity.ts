import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Post } from './../posts/post.entity';

@Entity('comments')
@ObjectType()
export class Comment extends Base {
  @Column('text')
  @Field()
  body: string;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  user: User;

  @ManyToOne(
    () => Post,
    post => post.comments,
    { onDelete: 'CASCADE' },
  )
  @Field(() => Post)
  post: Post;
}
