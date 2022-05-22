import { createAction, props } from "@ngrx/store";
import { IncomesExpenses } from "../../models/incomes-expenses.model";

export const Types = {
  setItems: '[I-E] Set Items',
  UnsetItems: '[I-E] Unset Items',

}

export const setItems =  createAction(Types.setItems, props<{items: IncomesExpenses[]}>());
export const unsetItems =  createAction(Types.UnsetItems);

