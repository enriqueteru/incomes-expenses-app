import { Routes } from '@angular/router';
import { GraphicsComponent } from '../graphics/graphics.component';
import { IncomesExpensesComponent } from '../incomes-expenses.component';
import { DetailComponent } from '../detail/detail.component';



export const dashboardRoutes: Routes = [

 { path: '', component: GraphicsComponent },
 { path: 'ingreso-egreso', component: IncomesExpensesComponent},
 { path: 'detalle', component: DetailComponent },

];
