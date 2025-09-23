import { TestBed } from '@angular/core/testing';

import { PricingBusinessRules } from './pricing.business';

describe('PricingService', () => {
  let service: PricingBusinessRules;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingBusinessRules);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
