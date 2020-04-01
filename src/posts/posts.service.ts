import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostInput } from './dto/create-post.input';
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

  async createPost(createPostData: PostInput, user: User): Promise<Post> {
    return this.postsRepository
      .create({
        ...createPostData,
        user,
      })
      .save();
  }

  async updatePost(
    id: number,
    updatePostData: PostInput,
    user: User,
  ): Promise<Post> {
    let post = await this.postsRepository.findOneOrFail({ id, user });

    return await this.postsRepository.save({ post, ...updatePostData });
  }

  async deletePost(id: number, user: User): Promise<string> {
    let post = await this.postsRepository.findOneOrFail({ id, user });

    await this.postsRepository.remove(post);
    return 'deleted successfully';
  }
}
