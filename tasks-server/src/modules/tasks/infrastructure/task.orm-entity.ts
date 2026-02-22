import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from '../domain/task-status.enum';
import { TaskPriority } from '../domain/task-priority.enum';
import { UserOrmEntity } from '../../users/infrastructure/user.orm-entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  status: TaskStatus;

  @Column({ type: 'text' })
  priority: TaskPriority;

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date | null;

  @Column()
  ownerId: number;

  @Column()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserOrmEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  user: UserOrmEntity;
}
