import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserInfo } from '../stores/user.reducer';

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
    }
  }

  async register(email: string, password: string): Promise<boolean | null> {
    const response = await firstValueFrom(
      this.http.post(userApiUrl + 'register', { email, password })
    );
    return response as boolean;
  }
}
