import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
    });
  }

  createTask() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  editTask(task: Task) {
    this.router.navigate([task.id, 'edit'], { relativeTo: this.route });
  }

  deleteTask(task: Task) {
    this.taskApi.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
      },
    });
  }
}
