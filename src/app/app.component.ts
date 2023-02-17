import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { User } from './stores/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-ui';
  constructor(private store: Store<User>) {}

  async ngOnInit() {
    const userFromStore = await firstValueFrom(this.store);
    if (userFromStore.userLoggedIn) {
      console.log('redirect to dash');
      //redirect to dashboard
    }
  }
}
