import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';
import { Task } from '../domain/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(title: string, userId: number) {
    const task = new Task(0, title, false, userId);
    return this.repo.create(task);
  }
}
