import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';
import { TaskStatus } from '../domain/task-status.enum';
import { TaskPriority } from '../domain/task-priority.enum';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  async execute(
    id: number,
    title: string | undefined,
    description: string | undefined,
    dueDate: Date | null | undefined,
    status: TaskStatus | undefined,
    priority: TaskPriority | undefined,
    userId: number,
  ) {
    const tasks = await this.repo.findAllByUser(userId);
    const existing = tasks.find((t) => t.id === id);

    if (!existing) throw new Error('Task not found');

    if (title !== undefined) existing.title = title;
    if (description !== undefined) existing.description = description;
    if (dueDate !== undefined) existing.dueDate = dueDate;
    if (status !== undefined) existing.status = status;
    if (priority !== undefined) existing.priority = priority;
    existing.updatedAt = new Date();

    return this.repo.update(existing);
  }
}
