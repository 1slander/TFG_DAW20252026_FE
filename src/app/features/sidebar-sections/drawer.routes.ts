import { Routes } from '@angular/router';

export const drawerRoutes: Routes = [
  {
    path: 'table',
    loadComponent: () => import('../sidebar-sections/table/table').then((m) => m.Table),
    title: 'Table',
  },
  {
    path: 'list',
    loadComponent: () => import('../sidebar-sections/list/list').then((m) => m.List),
    title: 'List',
  },
  {
    path: 'buttons',
    loadComponent: () => import('../sidebar-sections/buttons/buttons').then((m) => m.Buttons),
    title: 'Buttons',
  },
  {
    path: 'tabs',
    loadComponent: () => import('../sidebar-sections/tabs/tabs').then((m) => m.Tabs),
    title: 'Tabs',
  },
];
