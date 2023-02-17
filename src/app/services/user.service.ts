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
  constructor() {}

  login(email: string, password: string) {
    console.log('service ', email, password);
    if (
      userLookup.has(email) &&
      userLookup.get(email)['password'] === password
    ) {
      return userLookup.get(email);
    }
    return null;
  }
}
