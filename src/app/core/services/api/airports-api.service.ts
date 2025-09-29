import { inject, Injectable } from '@angular/core';
import { AirportDTO } from '@core/dtos/airport.dto';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private _airportsPath = environment.path.airports;

  constructor() { }

  getAirports(): Observable<AirportDTO> {
    return this._http.get<AirportDTO>(`${this._apiUrl}${this._airportsPath.getAll}`);
  }
}
