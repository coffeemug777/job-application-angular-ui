import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private router: ActivatedRoute,
    private openingService: OpeningService
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(this.router.params);
    this.openingId = params['id'] ? params['id'] : '';

    if (this.openingId !== '') {
      this.opening = this.openingService.get(this.openingId);
    }
  }
}
