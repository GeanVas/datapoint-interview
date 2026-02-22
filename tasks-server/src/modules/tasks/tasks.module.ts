import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/task.orm-entity';
import { TaskRepository } from './infrastructure/task.repository.impl';
import { TasksController } from './infrastructure/tasks.controller';
import { GetTasksUseCase } from './application/get-tasks.usecase';
import { CreateTaskUseCase } from './application/create-task.usecase';
import { UpdateTaskUseCase } from './application/update-task.usecase';
import { DeleteTaskUseCase } from './application/delete-task.usecase';
import { GetTaskUseCase } from './application/get-task.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TasksController],
  providers: [
    GetTasksUseCase,
    GetTaskUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
