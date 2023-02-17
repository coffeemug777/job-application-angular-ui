import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  password = '';
  email = '';

  constructor(private userService: UserService, private router: Router) {}

  loginClick() {
    console.log('loginclick');
    if (this.password !== '' && this.email !== '') {
      const user = this.userService.login(this.email, this.password);
      console.log('login is ', user);
      if (user) {
        //redirect to dashboard;
        this.router.navigate(['dashboard'], { state: { user: user } });
      }
    }
  }

  registerClick() {
    console.log('registerclick');
  }
}
