import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly router = inject(Router);

  login(user: {username: string, password: string}) {
    this.router.navigateByUrl('');
  }
}
