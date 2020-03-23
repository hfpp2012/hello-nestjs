import { Resolver, Query, Mutation } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Mutation(() => String)
  register() {
    return 'xxx';
  }
}
