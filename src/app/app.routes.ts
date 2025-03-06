import { Routes } from '@angular/router';
import { privateAuthGuard } from './core/guards/private-auth.guard';
import { publicAuthGuard } from './core/guards/public-auth.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/pages/tasks.component').then((m) => m.TasksComponent),
    canMatch: [privateAuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [publicAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
