import { TestBed } from '@angular/core/testing';

import { PassengersFacadeService } from './passengers-facade.service';

describe('PassengersFacadeService', () => {
  let service: PassengersFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengersFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
