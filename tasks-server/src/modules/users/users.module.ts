import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/user.orm-entity';
import { UserRepository } from './infrastructure/user.repository.impl';
import { CreateUserUseCase } from './application/create-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    CreateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['IUserRepository', CreateUserUseCase],
})
export class UsersModule {}
