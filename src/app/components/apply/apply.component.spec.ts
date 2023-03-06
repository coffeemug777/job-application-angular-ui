import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApplyComponent } from './apply.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApplyComponent', () => {
  let component: ApplyComponent;
  let fixture: ComponentFixture<ApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
