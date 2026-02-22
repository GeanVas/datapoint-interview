import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/user.orm-entity';
import { UserRepository } from './infrastructure/user.repository.impl';
import { CreateUserUseCase } from './application/create-user.usecase';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    CreateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IPasswordHasher',
      useClass: BcryptPasswordHasher,
    },
  ],
  exports: ['IUserRepository', CreateUserUseCase, 'IPasswordHasher'],
})
export class UsersModule {}
