import { Status } from "./status";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  status: Status;
  priority: string;
  createdAt: Date;
  updatedAt: Date | null;
}
