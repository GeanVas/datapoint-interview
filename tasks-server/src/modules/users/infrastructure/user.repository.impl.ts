import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private repo: Repository<UserOrmEntity>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { username } });
    if (!entity) return null;
    return new User(entity.id, entity.username, entity.password);
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) return null;
    return new User(entity.id, entity.username, entity.password);
  }

  async create(user: User): Promise<User> {
    const saved = await this.repo.save({
      username: user.username,
      password: user.password,
    });

    return new User(saved.id, saved.username, saved.password);
  }
}
