import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Mutation(() => User)
  register(@Args('data') registerData: RegisterInput): Promise<User> {
    return this.usersService.register(registerData);
  }

  @Mutation(() => User)
  login(@Args('data') loginData: LoginInput): Promise<User> {
    return this.usersService.login(loginData);
  }
}
