import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  form: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  authenticate() {
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}
