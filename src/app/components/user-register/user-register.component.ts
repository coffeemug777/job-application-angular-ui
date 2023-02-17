import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent {
  email = '';
  password1 = '';
  password2 = '';

  constructor(private router: Router, private userService: UserService) {}

  cancelClick() {
    this.router.navigate(['login']);
  }

  submitClick() {
    if (
      this.email !== '' &&
      this.password1 !== '' &&
      this.password2 !== '' &&
      this.password1 === this.password2
    ) {
      const register = this.userService.register(this.email, this.password1);
      if (register) {
        this.router.navigate(['dashboard'], { state: { user: register } });
      } else {
        console.log('error email already in use');
      }
    } else {
      // error blank, or password1 not equal password 2
      console.log('error blank, or password1 not equal password 2');
    }
  }
}
