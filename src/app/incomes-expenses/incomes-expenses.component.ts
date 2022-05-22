import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IncomesExpenses } from '../core/models/incomes-expenses.model';
import { AuthService } from '../services/auth.service';
import { IncomesExpensesService } from '../services/incomes-expenses.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-incomes-expenses',
  templateUrl: './incomes-expenses.component.html',
  styles: [],
})
export class IncomesExpensesComponent implements OnInit, OnDestroy {
  incomesForm!: FormGroup;
  type: string = '+';
  Loading: boolean = false;
  sus$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _ie: IncomesExpensesService,
    private _ui: UiService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this.incomesForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
    });
    this.sus$ = this._ui
      .isLoadingSuscription$()
      .subscribe(({ isLoading }) => (this.Loading = isLoading));
  }

  reset() {
    this.incomesForm.reset();
  }

  sendIncomes() {
    this._ui.startLoading();
    if (this.incomesForm.invalid) {
      this._ui.stopLoading();
    }

    const { description, amount } = this.incomesForm.value;
    const incomeExpense = new IncomesExpenses(description, amount, this.type);
    this._ie
      .addIncomeExpense({ ...incomeExpense }, this._auth.user.uid)
      .then((ref) => {
        this.incomesForm.reset();
        console.log('done', ref);
        this._ui.stopLoading();
      })
      .catch((err) => console.error(err));
  }

  ngOnDestroy(): void {
    this.sus$.unsubscribe();
  }
}
