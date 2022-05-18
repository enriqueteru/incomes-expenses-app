import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const AuthTypes = {
  setUser: '[Auth] Set User',
  unSetUser: '[Auth] Unset User',
}


export const setUser = createAction(
  AuthTypes.setUser,
  props<{user: User}>()
  );

export const unsetUser = createAction(
  AuthTypes.unSetUser
  );
