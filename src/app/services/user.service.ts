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

  markCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async login(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.post(userApiUrl + 'login', { email, password })
      );
      return response;
    } catch (error: any) {
      return {
        error: error.error.errorMessage,
      };
    }
  }

  async register(email: string, password: string): Promise<boolean | null> {
    const response = await firstValueFrom(
      this.http.post(userApiUrl + 'register', { email, password })
    );
    return response as boolean;
  }
}
