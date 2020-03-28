import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async all(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async one(id: number): Promise<Post> {
    return this.postsRepository.findOneOrFail(id);
  }

  async createPost(createPostData: CreatePostInput, user: User): Promise<Post> {
    return this.postsRepository
      .create({
        ...createPostData,
        user,
      })
      .save();
  }
}
