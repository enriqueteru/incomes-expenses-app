import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomesExpenses } from '../models/incomes-expenses.model';
import { map } from 'rxjs';
import { AppState } from '../state/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { stopLoading } from '../state/actions/UI.action';
import { AppStateFeature } from '../state/reducers/incomesExpenses.reducer';

@Injectable({
  providedIn: 'root',
})
export class IncomesExpensesService {
  constructor(
    private fs: AngularFirestore,
    private _s: Store<AppStateFeature>,
    private _auth: AuthService
  ) {}

  ieSelector() {
    return this._s.select('ie');
  }

  addIncomeExpense(incomeExpense: any, uid: string) {
    delete incomeExpense.uid
    return this.fs
      .doc(`${uid}/incomes-expenses/`)
      .collection('items')
      .add({ ...incomeExpense});
  }

  initIncomesExpenses$(uid: string) {
    return this.fs
      .collection(`${uid}/incomes-expenses/items`).valueChanges({ idField: 'uid' })
  }

  removeIncomeExpense(uidItem: string) {
    const uid = this._auth.user.uid;
    return this.fs.doc(`${uid}/incomes-expenses/items/${uidItem}`).delete();
  }
}
