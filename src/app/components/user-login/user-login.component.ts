import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  password = '';
  email = '';

  constructor(private userService: UserService) {}

  loginClick() {
    console.log('loginclick');
    if (this.password !== '' && this.email !== '') {
      console.log('');
      const login = this.userService.login(this.email, this.password);
    }
  }

  registerClick() {
    console.log('registerclick');
  }
}
