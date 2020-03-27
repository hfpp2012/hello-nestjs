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
  async register(@Args('data') registerData: RegisterInput): Promise<User> {
    return await this.usersService.register(registerData);
  }

  @Mutation(() => User)
  async login(@Args('data') loginData: LoginInput): Promise<User> {
    return await this.usersService.login(loginData);
  }
}
