import { inject, Injectable } from '@angular/core';
import { AirportDTO } from '@core/dtos/airport.dto';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
 private http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }

  getAirports(): Observable<AirportDTO> {
    return this.http.get<AirportDTO>(`${this.apiUrl}${environment.path.airports.getAll}`);
  }
}
