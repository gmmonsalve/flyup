import { TestBed } from '@angular/core/testing';

import { CountriesFacadeService } from './countries-facade.service';

describe('CountriesFacadeService', () => {
  let service: CountriesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
