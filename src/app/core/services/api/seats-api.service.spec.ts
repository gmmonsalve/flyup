import { TestBed } from '@angular/core/testing';

import { SeatsApiService } from './seats-api.service';

describe('SeatsApiService', () => {
  let service: SeatsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
