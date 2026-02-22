import { Inject, Injectable } from '@nestjs/common';
import * as userRepository from '../domain/user.repository';
import { User } from '../domain/user.entity';
import * as passwordHasherInterface from '../domain/password-hasher.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly repo: userRepository.IUserRepository,
    @Inject('IPasswordHasher')
    private readonly hasher: passwordHasherInterface.IPasswordHasher,
  ) {}

  async execute(username: string, password: string) {
    const hashed: string = await this.hasher.hash(password);
    const user = new User(0, username, hashed);
    return this.repo.create(user);
  }
}
