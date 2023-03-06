import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { Application, ApplicationConnector, Opening, OpeningService } from 'src/app/services/opening.service';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/stores/user.reducer';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.scss'],
})
export class OpeningsComponent {
  openings: Opening[] = [];
  application: Application | null = null;
  currentUser: UserInfo | null = null;

  constructor(private openingService: OpeningService, private applicationService: ApplicationService, private userService: UserService) {}

  async showContinue(openingId: string) {
    const existApplication = this.openings
      .find((opening) => opening.id === openingId)
      ?.incompleteApplications.find((application: ApplicationConnector) => application.email === this.currentUser?.email);

    if (existApplication !== undefined) {
      this.application = await firstValueFrom(this.applicationService.getById(existApplication.applicationId));
    }

    return existApplication !== undefined;
  }

  showCheckStatus(openingId: string) {
    return (
      this.openings
        .find((opening) => opening.id === openingId)
        ?.completedApplications.find((application: ApplicationConnector) => application.email === this.currentUser?.email) !== undefined
    );
  }

  showApply(openingId: string) {
    return !this.showContinue(openingId.toString()) && !this.showCheckStatus(openingId.toString());
  }

  async ngOnInit() {
    [this.openings, this.currentUser] = await Promise.all([this.openingService.getAll(), this.userService.getCurrentUser()]);

    //console.log('akua :', this.openings, this.currentUser);
  }
}
