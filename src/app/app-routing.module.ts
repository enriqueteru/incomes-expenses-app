import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './incomes-expenses/dashboard/dashboard.component';

import { dashboardRoutes } from './incomes-expenses/dashboard/dashboard.routes';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./incomes-expenses/ie.module').then((m) => m.IeModule),

  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
