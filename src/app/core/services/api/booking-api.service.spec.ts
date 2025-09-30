import { TestBed } from '@angular/core/testing';

import { BookingApiService } from './booking-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookingApiService', () => {
  let service: BookingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
