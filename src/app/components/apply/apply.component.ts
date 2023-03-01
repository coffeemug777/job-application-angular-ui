import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Opening, OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent {
  openingId: string = '';
  opening: Opening | null = null;

  applicationForm: FormGroup;
  generalError = '';

  submitted = false;

  constructor(
    private router: ActivatedRoute,
    private openingService: OpeningService,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['indocoffee@gmail.com', Validators.required],
      phone: ['1111111111', Validators.required],
      exps: this.fb.array([]),
    });
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

  saveClick() {
    this.openingService.saveApplication(
      this.openingId,
      this.applicationForm.value
    );
  }

  submitClick() {
    //console.log(this.applicationForm.value);
    this.submitted = true;

    if (!this.applicationForm.value.exps.length) {
      this.generalError = 'You must add at least one experience';
      console.log(this.generalError);
    } else {
      this.openingService.addApplication(
        this.openingId,
        this.applicationForm.value
      );
    }
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.router.params);
    this.openingId = params['id'] ? params['id'] : '';

    if (this.openingId !== '') {
      this.opening = await this.openingService.get(this.openingId);
    }
  }

  get experiences(): FormArray {
    return this.applicationForm.get('exps') as FormArray;
  }

  get applicationFormControl() {
    return this.applicationForm.controls;
  }
}
