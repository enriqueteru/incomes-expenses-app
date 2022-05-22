import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { IncomesExpenses } from 'src/app/core/models/incomes-expenses.model';
import { IncomesExpensesService } from 'src/app/core/services/incomes-expenses.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  incomesExpenses: IncomesExpenses[] = [];
  incomesExpenses$!: Subscription;

  constructor(private _ei: IncomesExpensesService) {}

  ngOnInit() {
   this.incomesExpenses$ = this._ei.ieSelector().subscribe(({ items }) => this.incomesExpenses = items);
  }


  remove(uid?: string){
    this._ei.removeIncomeExpense(uid!)

  }


  ngOnDestroy(): void {
      this.incomesExpenses$.unsubscribe();
  }


}
