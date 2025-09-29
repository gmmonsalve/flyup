import { TestBed } from '@angular/core/testing';

import { SeatsBusinessRules } from './seats.business';

describe('SeatsService', () => {
  let service: SeatsBusinessRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsBusinessRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
