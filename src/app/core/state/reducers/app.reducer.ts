import { ActionReducerMap } from '@ngrx/store';
import * as ui from './UI.reducer';
import * as auth from './auth.reducer';
import * as ie from './incomesExpenses.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State
  ie: ie.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  ie: ie.iEReducer
};
