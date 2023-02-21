import { Injectable } from '@angular/core';
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
  applications: Application[];
};

export type Experience = {
  company: '';
  title: '';
  startDate: '';
  endDate: '';
  description: '';
  isCurrent: false;
};

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  openings: Opening[] = [
    {
      id: '1',
      title: 'Software Engineer',
      description:
        'XYZ is seeking a Developer for a remote contract-to-hire position with our thriving Fortune 100 life insurance client. This is primarily remote, but the candidate must be willing to come onsite in the NY or PA office once per quarter',
      applications: [],
    },
    {
      id: '2',
      title: 'Support Manager',
      description:
        'This position is responsible for coordinating and facilitating the BCBSKS 12 week Big Room Planning(BRP)/collaborative planning efforts and support. This requires tight partnership with a variety of influencers and leaders across the organization including; Enterprise Planning team, PMO, Scrum Masters, Product Owners, ELT and CP3. This role helps ensure the company follows a regular cadence of formal, collaborative planning, with updates on prioritized work, other planning inputs, team planning, readouts, confidence votes, with regular reporting and risk monitoring with a variety of audiences, at all levels. The goals of BRP including transparency, systems learning and alignment by bringing multiple perspectives into the same room.',
      applications: [],
    },
  ];

  constructor(private userService: UserService) {}

  get(id: string) {
    return this.openings.find((opening) => opening.id === id) || null;
  }

  getAll() {
    return this.openings;
  }

  addApplication(id: string, value: Application) {
    const user = this.userService.getCurrentUser();
    const theOpening = this.openings.find((opening) => opening.id === id);

    if (theOpening && user) {
      value.userId = user.id;
      theOpening.applications.push(value);
    } else {
    }
  }

  removeApplication() {}
}
