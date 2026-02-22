import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskItem } from '../components/task-item';
import { Task } from '../../../shared/models/task';
import { TaskApi } from '../../../core/services/task-api';
import { Status } from '../../../shared/models/status';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem, ReactiveFormsModule],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  tasks = signal<Task[]>([]);
  statusControl = new FormControl('all');

  private readonly taskApi = inject(TaskApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
    });

    this.statusControl.valueChanges.subscribe((status) => {
      this.filterByStatus(status as Status);
    });
  }

  filterByStatus(status: Status | 'all') {
    const statusFilter = status === 'all' ? undefined : status;
    this.taskApi.getTasks(statusFilter).subscribe({
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
