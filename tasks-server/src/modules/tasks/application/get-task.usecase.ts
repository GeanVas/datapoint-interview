import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(userId: number, taskId: number) {
    return this.repo.findByIdAndByOwner(taskId, userId);
  }
}
