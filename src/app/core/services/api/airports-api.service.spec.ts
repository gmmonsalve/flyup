import { TestBed } from '@angular/core/testing';
import { AirportsService } from './airports-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AirportsService', () => {
  let service: AirportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AirportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
