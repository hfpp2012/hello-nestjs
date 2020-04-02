import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { CreateCommentInput } from '../comments/dto/create-comment.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async all(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async one(id: number): Promise<Post> {
    return this.postsRepository.findOneOrFail(id, {
      relations: ['comments', 'likes'],
    });
  }

  async createPost(createPostData: CreatePostInput, user: User): Promise<Post> {
    return this.postsRepository
      .create({
        ...createPostData,
        user,
      })
      .save();
  }

  async createComment(
    postId: number,
    createCommentData: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const post = await this.postsRepository.findOneOrFail(postId);

    return this.commentsRepository
      .create({
        ...createCommentData,
        user,
        post,
      })
      .save();
  }

  async updatePost(
    id: number,
    updatePostData: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    let post = await this.postsRepository.findOneOrFail({ id, user });

    return await this.postsRepository.save({ post, ...updatePostData });
  }

  async deletePost(id: number, user: User): Promise<boolean> {
    let post = await this.postsRepository.findOneOrFail({ id, user });

    await this.postsRepository.remove(post);
    return true;
  }

  async deleteComment(id: number, user: User): Promise<boolean> {
    let comment = await this.commentsRepository.findOneOrFail({ id, user });

    await this.commentsRepository.remove(comment);
    return true;
  }

  async likePost(id: number, user: User): Promise<Post> {
    let post = await this.postsRepository.findOneOrFail(id, {
      relations: ['likes'],
    });

    if (post.likes && post.likes.find(like => like.id === user.id)) {
      post.likes = post.likes.filter(like => like.id !== user.id);
    } else {
      post.likes = [...post.likes, user];
    }

    return await this.postsRepository.save(post);
  }
}
