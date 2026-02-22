import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetTasksUseCase } from '../application/get-tasks.usecase';
import { CreateTaskUseCase } from '../application/create-task.usecase';
import { UpdateTaskUseCase } from '../application/update-task.usecase';
import { DeleteTaskUseCase } from '../application/delete-task.usecase';
import * as authRequestInterface from 'src/modules/auth/infrastructure/auth-request.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskUseCase } from '../application/get-task.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly getTasks: GetTasksUseCase,
    private readonly getTask: GetTaskUseCase,
    private readonly createTask: CreateTaskUseCase,
    private readonly updateTask: UpdateTaskUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
  ) {}

  @Get()
  getAll(@Request() req: authRequestInterface.AuthRequest) {
    return this.getTasks.execute(req.user.id);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Request() req: authRequestInterface.AuthRequest,
  ) {
    return this.getTask.execute(req.user.id, +id);
  }

  @Post()
  create(
    @Body() body: CreateTaskDto,
    @Request() req: authRequestInterface.AuthRequest,
  ) {
    return this.createTask.execute(
      body.title,
      body.description,
      req.user.id,
      body.date,
      body.status,
      body.priority,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @Request() req: authRequestInterface.AuthRequest,
  ) {
    return this.updateTask.execute(
      +id,
      body.title,
      body.description,
      body.dueDate,
      body.status,
      body.priority,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTask.execute(+id);
  }
}
