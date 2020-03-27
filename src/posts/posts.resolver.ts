import { Controller, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Mutation, Args, Context } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Controller('posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('data') createPostData: CreatePostInput,
    @Context() context: any,
  ): Promise<Post> {
    const { user } = context.req;
    return await this.postsService.createPost(createPostData, user);
  }
}
