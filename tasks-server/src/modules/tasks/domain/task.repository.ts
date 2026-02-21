import { Task } from './task.entity';

export interface ITaskRepository {
  findAllByUser(userId: number): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: number): Promise<void>;
}
