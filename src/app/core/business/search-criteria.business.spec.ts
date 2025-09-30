import { TestBed } from '@angular/core/testing';

import { SearchCriteriaRules } from './search-criteria.business';
import { environment } from '@environments/environment';
import BookingRulesConfig from './interfaces/bookingRulesConfig.interface';

describe('SearchCriteriaService', () => {
  let criteriaRules: SearchCriteriaRules;
  let rulesConfig: BookingRulesConfig;

  beforeEach(() => {
   rulesConfig = environment.config;
   criteriaRules = new SearchCriteriaRules(rulesConfig);
  });

  it('should be created', () => {
    expect(criteriaRules).toBeTruthy();
  });
});
