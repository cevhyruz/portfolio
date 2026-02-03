import { Routes } from '@angular/router';
import { Layout } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
      },
      {
        path: '404',
        loadComponent: () => import('./pages/error/not-found/not-found').then(m => m.NotFound)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
