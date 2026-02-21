import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(userId: number) {
    return this.repo.findAllByUser(userId);
  }
}
