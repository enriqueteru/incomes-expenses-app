import { createAction } from "@ngrx/store";

export const Types = {
  isLoading: '[UI] loading starts',
  stopLoading: '[UI] loading ends'
}

export const isLoading =  createAction(Types.isLoading);
export const stopLoading =  createAction(Types.stopLoading);

