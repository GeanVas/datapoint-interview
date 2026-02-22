import { TaskPriority } from '../../domain/task-priority.enum';
import { TaskStatus } from '../../domain/task-status.enum';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: Date | null;
  status?: TaskStatus;
  priority?: TaskPriority;
}
