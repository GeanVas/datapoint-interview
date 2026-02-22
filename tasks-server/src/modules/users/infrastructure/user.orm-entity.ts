import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskOrmEntity } from '../../tasks/infrastructure/task.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TaskOrmEntity, (task) => task.user)
  tasks: TaskOrmEntity[];
}
