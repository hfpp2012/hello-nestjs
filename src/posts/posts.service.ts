import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async all(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async createPost(createPostData: CreatePostInput): Promise<Post> {
    return this.postsRepository
      .create({
        ...createPostData,
      })
      .save();
  }
}
