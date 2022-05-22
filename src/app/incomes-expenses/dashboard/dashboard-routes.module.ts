import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from 'src/app/auth/guard/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const childrenRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
