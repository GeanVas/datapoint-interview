import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApi } from '../../../core/services/task-api';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
})
export class TaskForm implements OnInit {

  form: FormGroup;
  protected taskId: number | null = null;

  private readonly taskApi = inject(TaskApi);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      priority: ['low', Validators.required],
      dueDate: [''],
    });
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskId = Number(taskId);
      this.taskApi.getTaskById(taskId).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  returnToList() {
    this.router.navigate(['/']);
  }

  saveTask() {
    if (!this.form.valid) return;

    if (this.taskId) {
      this.taskApi.updateTask(this.taskId, this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskApi.createTask(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
