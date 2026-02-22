import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { TaskOrmEntity } from './task.orm-entity';
import { TaskStatus } from '../domain/task-status.enum';

export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private repo: Repository<TaskOrmEntity>,
  ) {}

  async findAllByUser(userId: number, status?: TaskStatus): Promise<Task[]> {
    const query = this.repo
      .createQueryBuilder('task')
      .where('task.ownerId = :userId', { userId });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    const tasks = await query.getMany();

    return tasks.map(
      (t) =>
        new Task(
          t.id,
          t.title,
          t.description,
          t.status,
          t.priority,
          t.dueDate,
          t.ownerId,
          t.createdAt,
          t.updatedAt,
        ),
    );
  }

  async findByIdAndByOwner(id: number, ownerId: number): Promise<Task> {
    const t = await this.repo.findOneBy({ id, ownerId });

    if (!t) {
      throw new Error('Task not found');
    }

    return new Task(
      t.id,
      t.title,
      t.description,
      t.status,
      t.priority,
      t.dueDate,
      t.ownerId,
      t.createdAt,
      t.updatedAt,
    );
  }

  async create(task: Task): Promise<Task> {
    const saved = await this.repo.save({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      ownerId: task.ownerId,
      createdAt: task.createdAt,
    });

    return new Task(
      saved.id,
      saved.title,
      saved.description,
      saved.status,
      saved.priority,
      saved.dueDate,
      saved.ownerId,
      saved.createdAt,
      saved.updatedAt,
    );
  }

  async update(task: Task): Promise<Task> {
    await this.repo.update(task.id, {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      updatedAt: new Date(),
    });

    const updated = await this.repo.findOneBy({ id: task.id });

    if (!updated) {
      throw new Error('Task not found');
    }

    return new Task(
      updated.id,
      updated.title,
      updated.description,
      updated.status,
      updated.priority,
      updated.dueDate,
      updated.ownerId,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
