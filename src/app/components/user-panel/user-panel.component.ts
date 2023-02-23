import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInfo } from 'src/app/stores/user.reducer';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  @Input() user!: UserInfo | null;
  @Output() logoutEvent = new EventEmitter<void>();

  doLogout() {
    this.logoutEvent.emit();
  }
}
