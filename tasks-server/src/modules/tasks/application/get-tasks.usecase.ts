import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';
import { TaskStatus } from '../domain/task-status.enum';

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(userId: number, status?: TaskStatus) {
    return this.repo.findAllByUser(userId, status);
  }
}
