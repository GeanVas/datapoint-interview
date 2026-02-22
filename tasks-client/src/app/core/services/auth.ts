import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = `${environment.apiUrl}/login`;

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  login(user: {username: string, password: string}): Observable<void> {
    return this.httpClient.post<{ access_token: string }>(this.apiUrl, user).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
      }),
      map(() => void 0)
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
