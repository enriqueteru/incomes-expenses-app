import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomesExpenses } from '../core/models/incomes-expenses.model';
import { map } from 'rxjs';
import { AppState } from '../core/state/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { stopLoading } from '../core/state/actions/UI.action';

@Injectable({
  providedIn: 'root',
})
export class IncomesExpensesService {
  constructor(
    private fs: AngularFirestore,
    private _s: Store<AppState>,
    private _auth: AuthService
  ) {}

  ieSelector() {
    return this._s.select('ie');
  }

  addIncomeExpense(incomeExpense: any, uid: string) {
    return this.fs
      .doc(`${uid}/incomes-expenses/`)
      .collection('items')
      .add({ ...incomeExpense, uid: '' });
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
