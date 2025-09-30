import { ComponentFixture, TestBed } from '@angular/core/testing';
import  BookingResumeComponent  from './flights-resume-page.component';

describe('BookingResumeComponent', () => {
  let component: BookingResumeComponent;
  let fixture: ComponentFixture<BookingResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
