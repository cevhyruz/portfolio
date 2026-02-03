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
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About),
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
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
