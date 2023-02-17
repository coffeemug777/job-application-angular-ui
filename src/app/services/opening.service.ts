import { Injectable } from '@angular/core';

export type Application = {
  userId: string;
};

export type Opening = {
  id: string;
  title: string;
  description: string;
  applications: Application[];
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

  constructor() {}

  getAll() {
    return this.openings;
  }
}