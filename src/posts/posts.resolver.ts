import { UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Mutation, Args, Context, Resolver, Query, Int } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostInput } from './dto/create-post.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { nullable: 'items' })
  async getPosts() {
    return await this.postsService.all();
  }

  @Query(() => Post)
  async getPost(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.postsService.one(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('data') createPostData: PostInput,
    @Context() context: any,
  ): Promise<Post> {
    const { user } = context.req;
    return await this.postsService.createPost(createPostData, user);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('data') updatePostData: PostInput,
    @Context() context: any,
  ): Promise<Post> {
    const { user } = context.req;
    return await this.postsService.updatePost(id, updatePostData, user);
  }
}
