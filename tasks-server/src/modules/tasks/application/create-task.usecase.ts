import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';
import { Task } from '../domain/task.entity';
import { TaskStatus } from '../domain/task-status.enum';
import { TaskPriority } from '../domain/task-priority.enum';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(
    title: string,
    description: string,
    userId: number,
    date: Date | null,
    status: TaskStatus,
    priority: TaskPriority,
  ) {
    const task = new Task(
      0,
      title,
      description,
      status,
      priority,
      date,
      userId,
      new Date(),
      null,
    );
    return this.repo.create(task);
  }
}
