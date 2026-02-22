import { TaskPriority } from './task-priority.enum';
import { TaskStatus } from './task-status.enum';

export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public description: string,
    public status: TaskStatus,
    public priority: TaskPriority,
    public dueDate: Date | null,
    public ownerId: number,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
