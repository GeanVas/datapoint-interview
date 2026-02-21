import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  async execute(
    id: number,
    title: string | undefined,
    completed: boolean | undefined,
    userId: number,
  ) {
    const tasks = await this.repo.findAllByUser(userId);
    const existing = tasks.find((t) => t.id === id);

    if (!existing) throw new Error('Task not found');

    if (title !== undefined) existing.title = title;
    if (completed !== undefined) existing.completed = completed;

    return this.repo.update(existing);
  }
}
