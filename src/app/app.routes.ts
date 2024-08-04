import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./modules/form/form.module').then((m) => m.FormModule),
  },
];
