import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import SeatsDTO from '@core/dtos/seat.dto';

@Injectable({
  providedIn: 'root'
})
export class SeatsApiService {

  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private _seatsPath = environment.path.seats;
  
  getAllSeatsByFlight(flightNumber: string): Observable<SeatsDTO>{
    return this._http.post<SeatsDTO>(`${this._apiUrl}${this._seatsPath.getAll}`, { flightNumber });
  }

}
