import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Application,
  Opening,
  OpeningService,
} from 'src/app/services/opening.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent {
  openingId: string = '';
  opening: Opening | null = null;
  existingApplication: Application | null = null;

  applicationForm: FormGroup;
  generalError = '';

  submitted = false;

  constructor(
    private router: Router,
    private openingService: OpeningService,
    private fb: FormBuilder
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state?.['opening']) {
      this.opening =
        this.router.getCurrentNavigation()?.extras?.state?.['opening'];
      this.openingId = this.opening?.id || '';
    }

    if (this.router.getCurrentNavigation()?.extras?.state?.['application']) {
      this.existingApplication =
        this.router.getCurrentNavigation()?.extras?.state?.['application'];

      this.applicationForm = this.fb.group({
        firstName: [this.existingApplication?.firstName, Validators.required],
        lastName: [this.existingApplication?.lastName, Validators.required],
        email: [this.existingApplication?.email, Validators.required],
        phone: [this.existingApplication?.phone, Validators.required],

        //TODO Need to do manual input on this....
        exps: this.fb.array([]),
      });
    } else {
      this.applicationForm = this.fb.group({
        firstName: ['John', Validators.required],
        lastName: ['Doe', Validators.required],
        email: ['indocoffee@gmail.com', Validators.required],
        phone: ['1111111111', Validators.required],
        exps: this.fb.array([]),
      });
    }
  }

  newExperience() {
    return this.fb.group({
      company: ['comp 1', Validators.required],
      title: ['title 1', Validators.required],
      startDate: ['03/01/2020', Validators.required],
      endDate: '',
      description: 'test some descripton',
      isCurrent: true,
    });
  }

  addExperience() {
    this.generalError = '';
    return this.experiences.push(this.newExperience());
  }

  removeExperience(expIndex: number) {
    if (!this.applicationForm.value.exps.length) {
      this.generalError = 'You must add at least one experience';
      console.log(this.generalError);
    }

    this.experiences.removeAt(expIndex);
  }

  async saveClick() {
    console.log('adsf ', this.openingId.toString(), this.applicationForm.value);
    await this.openingService.saveApplication(
      this.openingId,
      this.applicationForm.value
    );
  }

  submitClick() {
    this.submitted = true;

    if (!this.applicationForm.value.exps.length) {
      this.generalError = 'You must add at least one experience';
      console.log(this.generalError);
    } else {
      // this.openingService.addApplication(
      //   this.openingId,
      //   this.applicationForm.value
      // );
    }
  }

  get experiences(): FormArray {
    return this.applicationForm.get('exps') as FormArray;
  }

  get applicationFormControl() {
    return this.applicationForm.controls;
  }
}
