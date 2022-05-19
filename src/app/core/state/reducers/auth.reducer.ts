import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as actions from '../actions/Auth.action';
import { AppState } from './app.reducer';

export interface State {
  user: User;
}

export const initialState: State = {
  user: {} as User,
};

const _autReducer = createReducer(
  initialState,
  on(actions.setUser, (state, {user}) => ({
    ...state,
    user
  })),
  on(actions.unsetUser, (state) => ({
    ...state,
    user: {} as User
  }))
);


export const authReducer = (state: any, action: any) => {
  return _autReducer(state, action)
}
