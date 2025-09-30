import { TestBed } from '@angular/core/testing';

import { FlightsApiService } from './flights-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('FlightsApiService', () => {
  let service: FlightsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FlightsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
