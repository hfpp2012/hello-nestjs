import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.input';
import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async register(registerData: RegisterInput): Promise<User> {
    return this.usersRepository
      .create({
        ...registerData,
      })
      .save();
  }

  async login(loginData: LoginInput): Promise<User> {
    return await this.usersRepository.findOneOrFail({
      username: loginData.username,
    });
  }
}
