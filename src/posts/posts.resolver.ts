import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Mutation, Args } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Controller('posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('data') createPostData: CreatePostInput): Promise<Post> {
    return this.postsService.createPost(createPostData);
  }
}
