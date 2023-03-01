import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  completedApplications: Application[];
  incompleteApplications: Application[];
};

export type Experience = {
  company: '';
  title: '';
  startDate: '';
  endDate: '';
  description: '';
  isCurrent: false;
};

const applicationServiceUrl = 'http://localhost:8081/api/application';
const openingServiceUrl = 'http://localhost:8082/api/opening';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  openings: Opening[] = [];

  constructor(private userService: UserService, private http: HttpClient) {}

  get(id: string) {
    return this.openings.find((opening) => opening.id === id) || null;
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

  addApplication(id: string, value: Application) {
    const user = this.userService.getCurrentUser();
    const theOpening = this.openings.find((opening) => opening.id === id);

    if (theOpening && user) {
      value.userId = user.email;
      theOpening.completedApplications.push(value);
    } else {
    }
  }

  removeApplication() {}
}
