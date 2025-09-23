import { TestBed } from '@angular/core/testing';

import { BookingRules } from './booking.business';

describe('BookingService', () => {
  let service: BookingRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
