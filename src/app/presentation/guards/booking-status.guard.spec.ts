import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bookingStatusGuard } from './booking-status.guard';

describe('bookingStatusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bookingStatusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
