import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Mutation(() => String)
  register(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
  ): Promise<User> {
    return this.usersService.register({
      email,
      username,
      password,
      confirmPassword,
    });
  }
}
