import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { TaskOrmEntity } from './task.orm-entity';

export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private repo: Repository<TaskOrmEntity>,
  ) {}

  async findAllByUser(userId: number): Promise<Task[]> {
    const tasks = await this.repo.find({ where: { userId } });

    return tasks.map(
      (t) => new Task(t.id, t.title, t.status, t.date, t.userId),
    );
  }

  async create(task: Task): Promise<Task> {
    const saved = await this.repo.save({
      title: task.title,
      date: task.date,
      status: task.status,
      userId: task.userId,
    });

    return new Task(
      saved.id,
      saved.title,
      saved.status,
      saved.date,
      saved.userId,
    );
  }

  async update(task: Task): Promise<Task> {
    await this.repo.update(task.id, {
      title: task.title,
      status: task.status,
      date: task.date,
    });

    const updated = await this.repo.findOneBy({ id: task.id });

    if (!updated) {
      throw new Error('Task not found');
    }

    return new Task(
      updated.id,
      updated.title,
      updated.status,
      updated.date,
      updated.userId,
    );
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
