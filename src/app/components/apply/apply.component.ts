import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Form, FormArray } from '@angular/forms';
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

  constructor(
    private router: ActivatedRoute,
    private openingService: OpeningService,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      exps: this.fb.array([]),
    });
  }

  newExperience() {
    return this.fb.group({
      company: '',
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false,
    });
  }

  addExperience() {
    return this.experiences.push(this.newExperience());
  }

  removeExperience(expIndex: number) {
    this.experiences.removeAt(expIndex);
  }

  submitClick() {
    console.log(this.experiences);
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.router.params);
    this.openingId = params['id'] ? params['id'] : '';

    if (this.openingId !== '') {
      this.opening = this.openingService.get(this.openingId);
    }
  }

  get experiences(): FormArray {
    return this.applicationForm.get('exps') as FormArray;
  }
}
