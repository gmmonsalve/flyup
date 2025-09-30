import { TestBed } from '@angular/core/testing';
import { CountriesApiService } from './country-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CountryApiService', () => {
  let service: CountriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
