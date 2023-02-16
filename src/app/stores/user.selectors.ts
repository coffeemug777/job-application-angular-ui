import { User } from './user.reducer';

export const selectLoggedUser = (state: User) => state.user;
