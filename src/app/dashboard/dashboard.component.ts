import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setItems } from '../core/state/actions/incomesExpenses.actions';
import { AppState } from '../core/state/reducers/app.reducer';
import { IncomesExpensesService } from '../core/services/incomes-expenses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user$?: Subscription;
  ie$?: Subscription;
  items!: any;
  constructor(
    private _s: Store<AppState>,
    private _ie: IncomesExpensesService
  ) {}

  ngOnInit() {
    this.user$ = this._s
      .select('auth')
      .subscribe(
        ({user}) =>{
            this.ie$ = this._ie
            .initIncomesExpenses$(user.uid)
            .subscribe((items: any) => this._s.dispatch(setItems({ items })))}
      );
  }

  ngOnDestroy(): void {

    this.user$?.unsubscribe();
    this.ie$.unsubscribe()}



}
