import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
export interface UserInfo {
  id: string;
  email: string;
  password: string;
}

export interface User {
  userLoggedIn: boolean;
  user: UserInfo | null;
}

export const initialState: User = {
  userLoggedIn: false,
  user: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state) => ({ ...state })),
  on(UserActions.logOut, (state) => ({ ...state })),
  on(UserActions.register, (state) => ({ ...state }))
);

export function reducer(state: User | undefined, action: Action) {
  return userReducer(state, action);
}
