import { inject, Injectable } from '@angular/core';
import CountriesMapper from '@app/abstraction/mappers/countries.mapper';
import Country from '@app/core/models/country.model';
import { CountriesApiService } from '@app/core/services/api/country-api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesFacadeService {

  private _countryApi = inject(CountriesApiService);
  private countriesMapper = new CountriesMapper();

  getCountries(): Observable<Country[]>{
    return this._countryApi.getCountries().pipe(
      map(this.countriesMapper.toDomain.bind(this))
    );
  }
}
