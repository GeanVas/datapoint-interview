import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskItem } from '../components/task-item';
import { Task } from '../../../shared/models/task';
import { TaskApi } from '../../../core/services/task-api';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  tasks = signal<Task[]>([]);

  private readonly taskApi = inject(TaskApi);

  ngOnInit(): void {
    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      }
    })
  }
}
