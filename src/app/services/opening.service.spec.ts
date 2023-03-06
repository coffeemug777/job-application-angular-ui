import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OpeningService } from '../services/opening.service';

describe('OpeningService', () => {
  let service: OpeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(OpeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
