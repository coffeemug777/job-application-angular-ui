import { Component } from '@angular/core';
import { Opening, OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.scss'],
})
export class OpeningsComponent {
  openings: Opening[] = [];
  constructor(private openingService: OpeningService) {}

  async ngOnInit() {
    this.openings = await this.openingService.getAll();
  }
}
