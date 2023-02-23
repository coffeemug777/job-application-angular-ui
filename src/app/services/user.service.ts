import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserInfo } from '../stores/user.reducer';

const userApiUrl = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: UserInfo | null = {
    email: 'indocoffee@gmail.com',
    password: 'test123',
  };
  constructor(private http: HttpClient, private router: Router) {}

  markCurrentUser(user: UserInfo) {
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

  logout() {
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  async register(email: string, password: string): Promise<boolean | null> {
    const response = await firstValueFrom(
      this.http.post(userApiUrl + 'register', { email, password })
    );
    return response as boolean;
  }
}
