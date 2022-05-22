import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { IncomesExpenses } from '../../models/incomes-expenses.model';
import * as actions from '../actions/incomesExpenses.actions';
import { AppState } from './app.reducer';

export interface State {
  items: IncomesExpenses[];
}

export const initialState: State = {
  items: [],
};


export interface AppStateFeature extends AppState {
  ie: State
}

export const _iEReducer = createReducer(
  initialState,
  on(actions.setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),
  on(actions.unsetItems, (state) => ({
    ...state,
    items: [],
  }))
);

export const iEReducer = (state: any, action: any) => _iEReducer(state, action);
