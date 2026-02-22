import { DataSource } from 'typeorm';
import { UserOrmEntity } from './modules/users/infrastructure/user.orm-entity';
import { TaskOrmEntity } from './modules/tasks/infrastructure/task.orm-entity';
import { InitialMigration1771727876407 } from './migrations/1771727876407-InitialMigration';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  entities: [UserOrmEntity, TaskOrmEntity],
  migrations: [InitialMigration1771727876407],
  synchronize: false,
});
