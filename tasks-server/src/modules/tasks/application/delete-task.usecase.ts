import { Inject, Injectable } from '@nestjs/common';
import * as taskRepository from '../domain/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly repo: taskRepository.ITaskRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
