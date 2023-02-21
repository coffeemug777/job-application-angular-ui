import { Injectable } from '@angular/core';
import { UserInfo } from '../stores/user.reducer';

const users: UserInfo[] = [
  {
    id: '1',
    email: 'indocoffee@gmail.com',
    password: 'test123',
  },
  {
    id: '2',
    email: 'test@test.com',
    password: 'test123',
  },
];

const userLookup = new Map();
users.forEach((user) => {
  userLookup.set(user.email, user);
});

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: UserInfo | null = null;
  constructor() {}

  markCurrentUser(user: UserInfo) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(email: string, password: string) {
    if (
      userLookup.has(email) &&
      userLookup.get(email)['password'] === password
    ) {
      return userLookup.get(email);
    }
    return null;
  }

  register(email: string, password: string) {
    if (userLookup.has(email)) {
      return null;
      // error email already exist
    } else {
      const newUser = {
        id: (users.length + 1).toString(),
        email,
        password,
      };
      users.push(newUser);

      userLookup.set(email, newUser);
      return newUser;
    }
  }
}
