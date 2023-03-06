import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRegisterComponent } from './user-register.component';
import { FormsModule } from '@angular/forms';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
