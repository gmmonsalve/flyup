import { TestBed } from '@angular/core/testing';

import { AirportsFacadeService } from './airports-facade.service';

describe('AirportsFacadeService', () => {
  let service: AirportsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
