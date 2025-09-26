import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountriesDTO, CountryDTO } from '@app/core/dtos/country.dto';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {

  private _api = inject(HttpClient);
  private apiPath = environment.apiUrl;
  private countriesPath = environment.path.countries;

  getCountries(): Observable<CountriesDTO>{
    return this._api.get<CountriesDTO>(`${this.apiPath}${this.countriesPath.getAll}`);
  }


}
