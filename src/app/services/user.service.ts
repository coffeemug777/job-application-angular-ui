import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

const userApiUrl = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: UserInfo | null = null;
  constructor(private http: HttpClient) {}

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

  async register(email: string, password: string): Promise<boolean | null> {
    if (userLookup.has(email)) {
      return null;
      // error email already exist
    } else {
      const response = await firstValueFrom(
        this.http.post(userApiUrl + 'register', { email, password })
      );
      return response as boolean;
    }
  }
}
