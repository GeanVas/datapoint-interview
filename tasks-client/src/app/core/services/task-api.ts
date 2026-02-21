import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = [
      {
        title: 'Task',
        date: new Date(),
        status: 'pending'
      },
      {
        title: 'Another Task',
        date: new Date(),
        status: 'completed'
      },
      {
        title: 'Third Task',
        date: new Date(),
        status: 'in_progress'
      }
    ];

    return of(tasks);
  }
}
