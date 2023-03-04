import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserInfo } from '../stores/user.reducer';
import { ApplicationService } from './application.service';
import { UserService } from './user.service';

export type Application = {
  id: string;
  userId: string;
  firstName: '';
  lastName: '';
  email: '';
  phone: '';
  exps: Experience[];
};

export type Opening = {
  id: string;
  title: string;
  description: string;
  completedApplications: ApplicationConnector[];
  incompleteApplications: ApplicationConnector[];
};

export type Experience = {
  company: '';
  title: '';
  startDate: '';
  endDate: '';
  description: '';
  isCurrent: false;
};

export type ApplicationConnector = {
  applicationId: string;
  email: string;
};

const openingServiceUrl = 'http://localhost:8082/api/opening';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  openings: Opening[] = [];

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private http: HttpClient
  ) {}

  async get(id: string) {
    return (await firstValueFrom(
      this.http.get(openingServiceUrl + '/' + id)
    )) as Opening;
  }

  async getAll() {
    const openings = await firstValueFrom(
      this.http.get(openingServiceUrl + '/all')
    );

    this.openings = openings as Opening[];
    return this.openings;
  }

  /*
      loop through opening incomplete application and complete application, make sure none of the application connector there exist,
        if it exist in complete, show error message already applied
        if it exist in incomplete, 
          overwrite the application data only
        if it doesn't exist, create a new application, and add to incomplete
    */
  async saveApplication(id: string, value: Application) {
    const [user, theOpening] = await Promise.all([
      this.userService.getCurrentUser(),
      this.get(id),
    ]);

    if (theOpening && user) {
      const alreadyComplete =
        theOpening.completedApplications.find(
          (app) => app.email === user.email
        ) !== undefined;

      if (alreadyComplete) {
        this.alreadyApplied();
      } else {
        const foundIncomplete = theOpening.incompleteApplications.find(
          (app) => app.email === user.email
        );

        if (!!foundIncomplete) {
          await this.updateExistingApplication(foundIncomplete, value);
        } else {
          await this.createNewApplication(value, user, theOpening, id);
        }
      }
    } else {
      console.log('either user or opening gave an error!');
    }
  }

  alreadyApplied() {
    console.log('user already completed application');
  }

  async updateExistingApplication(
    foundIncomplete: ApplicationConnector,
    value: Application
  ) {
    await firstValueFrom(
      this.applicationService.update(foundIncomplete.applicationId, value)
    );
  }

  async createNewApplication(
    value: Application,
    user: UserInfo,
    theOpening: Opening,
    id: string
  ) {
    const newApp = await firstValueFrom(
      this.applicationService.add({ ...value, userId: user.email })
    );

    if (newApp.id !== null) {
      theOpening.incompleteApplications.push({
        applicationId: newApp.id,
        email: user.email,
      });

      await firstValueFrom(
        this.http.put(openingServiceUrl + '/update/' + id, theOpening)
      );
    }
  }
}
