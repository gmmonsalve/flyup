import { TestBed } from '@angular/core/testing';

import { PricingBusinessRules } from './pricing.business';

describe('PricingService', () => {
  let pricingClass: PricingBusinessRules;

  beforeEach(() => {
    pricingClass = new PricingBusinessRules();
  });

  it('should be created', () => {
    expect(pricingClass).toBeTruthy();
  });
});
