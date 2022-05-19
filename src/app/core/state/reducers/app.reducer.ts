import { ActionReducerMap } from '@ngrx/store';
import * as ui from './UI.reducer';
import * as auth from './auth.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
};
