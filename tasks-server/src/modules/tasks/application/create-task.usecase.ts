import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';
import { Task } from '../domain/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(title: string, userId: number, date: Date) {
    const task = new Task(0, title, 'pending', date, userId);
    return this.repo.create(task);
  }
}
