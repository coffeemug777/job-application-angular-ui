import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface State {
  userLoggedIn: boolean;
  user: {};
}

export const initialState: State = {
  userLoggedIn: false,
  user: {},
};

const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state) => ({ ...state })),
  on(UserActions.logOut, (state) => ({ ...state })),
  on(UserActions.register, (state) => ({ ...state }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
