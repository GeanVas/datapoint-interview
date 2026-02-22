import { TaskPriority } from '../../domain/task-priority.enum';
import { TaskStatus } from '../../domain/task-status.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  date: Date | null;
  status: TaskStatus;
  priority: TaskPriority;
}
