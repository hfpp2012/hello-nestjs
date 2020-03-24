import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async register(input: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }): Promise<User> {
    return this.usersRepository.save(input);
  }
}
