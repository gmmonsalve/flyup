import { TestBed } from '@angular/core/testing';

import { BookingFacadeService } from './booking-facade.service';
import { BOOKING_RULES } from '@app/core/business/constants/bussiness.constants';
import { environment } from '@environments/environment';
import { BookingStateService } from '@app/core/state/booking/booking-state.service';
import { SearchStateService } from '@app/core/state/search/search-state.service';
import { BookingApiService } from '@app/core/services/api/booking-api.service';

describe('BookingFacadeService', () => {
  let service: BookingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingStateService,
        SearchStateService,
        { provide: BOOKING_RULES, useValue: environment.config },
        { provide: BookingApiService, useValue: {} }
      ]
    });
    service = TestBed.inject(BookingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
