import { TestBed } from '@angular/core/testing';

import { SearchFacadeService } from './search-facade.service';
import { SearchStateService } from '@app/core/state/search/search-state.service';
import { BOOKING_RULES } from '@app/core/business/constants/bussiness.constants';
import { environment } from '@environments/environment';

describe('SearchFacadeService', () => {
  let service: SearchFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchStateService,
        {provide: BOOKING_RULES, useValue: environment.config}
      ]
    });
    service = TestBed.inject(SearchFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
