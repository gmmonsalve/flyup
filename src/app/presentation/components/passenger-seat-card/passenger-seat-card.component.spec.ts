import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSeatCardComponent } from './passenger-seat-card.component';

describe('PassengerSeatCardComponent', () => {
  let component: PassengerSeatCardComponent;
  let fixture: ComponentFixture<PassengerSeatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerSeatCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PassengerSeatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
