import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from './dashboard/dashboard-routes.module';

import { SortListPipe } from '../core/pipes/sort-list.pipe';
import { OnlyExpensesPipe } from '../core/pipes/only-expenses.pipe';
import { OnlyIncomesPipe } from '../core/pipes/only-incomes.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { DetailComponent } from './detail/detail.component';
import { IncomesExpensesComponent } from './incomes-expenses.component';
import { StoreModule } from '@ngrx/store';
import * as ie from '../core/state/reducers/incomesExpenses.reducer';


const comp = [
  DashboardComponent,
  GraphicsComponent,
  IncomesExpensesComponent,
  DetailComponent,
  SortListPipe,
  OnlyExpensesPipe,
  OnlyIncomesPipe,
];

@NgModule({
  declarations: [...comp],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('ie', ie.iEReducer),
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutesModule,
    NgChartsModule,
  ],
  exports: [...comp],
})
export class IeModule {}
