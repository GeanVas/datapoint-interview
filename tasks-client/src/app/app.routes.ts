import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: '',
    canMatch: [authGuard],
    loadChildren: () => import('./features/tasks/tasks.routes').then((r) => r.TASKS_ROUTES),
  },
];
