import { TestBed } from '@angular/core/testing';

import { SeatsFacadeService } from './seats-facade.service';

describe('SeatsFacadeService', () => {
  let service: SeatsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
