import { TestBed } from '@angular/core/testing';

import { SeatsBusinessRules } from './seats.business';

describe('SeatsService', () => {
  let seats: SeatsBusinessRules;

  beforeEach(() => {
    seats = new SeatsBusinessRules();
  });

  it('should be created', () => {
    expect(seats).toBeTruthy();
  });
});
