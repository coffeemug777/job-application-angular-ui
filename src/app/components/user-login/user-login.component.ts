import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { validateEmail } from 'src/app/shared/utils/functions';
import { UserInfo } from 'src/app/stores/user.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  password = '';
  email = '';
  errorMsg: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  async loginClick() {
    this.errorMsg = [];
    if (this.password === '' || this.email === '') {
      this.errorMsg.push('Error: email or password can not be blank');
    }
    if (this.password.length < 8) {
      this.errorMsg.push('Error: password should have 8 or more characters');
    }
    if (!validateEmail(this.email)) {
      this.errorMsg.push('Error: Invalid email format');
    }

    if (this.errorMsg.length === 0) {
      const user = await this.userService.login(this.email, this.password);
      if (!(user as { error: any }).error) {
        this.userService.markCurrentUser(user as UserInfo);
        //redirect to dashboard;
        this.router.navigate(['dashboard'], { state: { user: user } });
      } else {
        this.errorMsg.push((user as { error: any }).error);
      }
    }
  }

  registerClick() {
    console.log('registerclick');
    this.router.navigate(['register']);
  }
}
