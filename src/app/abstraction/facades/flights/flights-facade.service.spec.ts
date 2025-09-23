import { TestBed } from '@angular/core/testing';

import { FlightsFacadeService } from './flights-facade.service';

describe('FlightsFacadeService', () => {
  let service: FlightsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
