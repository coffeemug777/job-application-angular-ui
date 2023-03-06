import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IsLoggedInGuard } from './is-logged-in.guard';

describe('IsLoggedInGuard', () => {
  let guard: IsLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(IsLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
