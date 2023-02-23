import { Component } from '@angular/core';
import { Opening, OpeningService } from 'src/app/services/opening.service';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/stores/user.reducer';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.scss'],
})
export class OpeningsComponent {
  openings: Opening[] = [];
  currentUser: UserInfo | null = null;
  constructor(
    private openingService: OpeningService,
    private userService: UserService
  ) {}

  showContinue(openingId: string) {
    return (
      this.openings
        .find((opening) => opening.id === openingId)
        ?.incompleteApplications.find(
          (application) => application.userId === this.currentUser?.email
        ) !== undefined
    );
  }

  showCheckStatus(openingId: string) {
    return (
      this.openings
        .find((opening) => opening.id === openingId)
        ?.completedApplications.find(
          (application) => application.userId === this.currentUser?.email
        ) !== undefined
    );
  }

  showApply(openingId: string) {
    return !this.showContinue(openingId) && !this.showCheckStatus(openingId);
  }

  async ngOnInit() {
    [this.openings, this.currentUser] = await Promise.all([
      this.openingService.getAll(),
      this.userService.getCurrentUser(),
    ]);

    console.log(this.openings, this.currentUser);
  }
}
