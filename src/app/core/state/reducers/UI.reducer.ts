import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/UI.action';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

export const _uiReducer = createReducer(
  initialState,
  on(actions.isLoading, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(actions.stopLoading, (state) => ({
    ...state,
    isLoading: false,
  }))
);


export const uiReducer = (state: any, action: any) => _uiReducer(state, action)
