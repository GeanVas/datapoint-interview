import { Injectable } from '@nestjs/common';
import * as userRepository from '../domain/user.repository';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repo: userRepository.IUserRepository) {}

  async execute(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User(0, username, hashed);
    return this.repo.create(user);
  }
}
