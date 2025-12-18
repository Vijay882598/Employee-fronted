import { Routes } from '@angular/router';

export const routes: Routes = [
     {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/components/components-routing.module').then(m => m.EMPLOYEE_ROUTES)
  },
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  }
 ];
