import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SearchDTO, SearchResultDTO } from '@app/core/dtos/search.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsApiService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;


  constructor() { }

  getFligths(searchDTO: SearchDTO): Observable<SearchResultDTO>{
    return this._http.post<SearchResultDTO>(`${this._apiUrl}${environment.path.flights.search}`, searchDTO)
  }

}
