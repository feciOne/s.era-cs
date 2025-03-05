import { Routes } from '@angular/router';

import { YouWillLostYourProgressGuard } from './core/guards/you-will-lost-your-progress.guard';

import { MainLayoutComponent } from './core/components/layouts/main-layout.component';
import { HomeComponent } from './features/pages/home/home.component';
import { ListComponent } from './features/pages/list/list.component';
import { FormComponent } from './features/pages/form/form.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'list', component: ListComponent },
      {
        path: 'form',
        component: FormComponent,
        canDeactivate: [YouWillLostYourProgressGuard],
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
