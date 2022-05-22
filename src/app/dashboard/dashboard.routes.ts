import { Routes } from '@angular/router';
import { GraphicsComponent } from '../incomes-expenses/graphics/graphics.component';
import { IncomesExpensesComponent } from '../incomes-expenses/incomes-expenses.component';
import { DetailComponent } from '../incomes-expenses/detail/detail.component';



export const dashboardRoutes: Routes = [

 { path: '', component: GraphicsComponent },
 { path: 'ingreso-egreso', component: IncomesExpensesComponent},
 { path: 'detalle', component: DetailComponent },

];
