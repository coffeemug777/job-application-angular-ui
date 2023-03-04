import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

  saveApplication(id: string, value: Application) {
    const user = this.userService.getCurrentUser();
    const theOpening = this.openings.find((opening) => opening.id === id);

    if (theOpening && user) {
      value.userId = user.email;
      theOpening.incompleteApplications.push(value);
    } else {
    }
  }


  }

}
