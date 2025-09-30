import { TestBed } from '@angular/core/testing';

import { PassengersFacadeService } from './passengers-facade.service';
import { BookingFacadeService } from '../booking/booking-facade.service';

describe('PassengersFacadeService', () => {
  let service: PassengersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BookingFacadeService, useValue: {} }]
    });
    service = TestBed.inject(PassengersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
