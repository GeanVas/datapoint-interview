import { Status } from "../models/status";

export function getStatusLabel(status: Status) {
  if (status === 'in_progress') return 'in progress';
  return status;
}
