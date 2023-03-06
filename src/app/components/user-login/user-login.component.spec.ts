import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLoginComponent } from './user-login.component';
import { FormsModule } from '@angular/forms';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
