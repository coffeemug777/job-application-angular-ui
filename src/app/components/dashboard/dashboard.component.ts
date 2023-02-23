import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/stores/user.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  user: UserInfo | null = null;
  currentComp = 'openings';

  constructor(private router: Router, private userService: UserService) {
    const routerExtraState = this.router.getCurrentNavigation()?.extras?.state;
    if (routerExtraState && routerExtraState['user']) {
      this.user = routerExtraState['user'];
    }
  }

  goto(comp: string) {
    if (this.currentComp !== comp) {
      this.currentComp = comp;
    }
  }

  logout(): void {
    this.userService.logout();
  }
}
