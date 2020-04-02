import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../shared/base.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

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

  @OneToMany(
    () => Comment,
    comment => comment.post,
  )
  @Field(() => [Comment], { nullable: 'items' })
  comments: Comment[];

  @Field(() => Int)
  get commentCount() {
    return this.comments.length;
  }
}
