import { inject, Injectable } from '@angular/core';
import { AirportsService } from '@core/services/airports.service';
import Airport from '@core/models/airport.model';
import { map, Observable } from 'rxjs';
import AirportsMapper from '@abstraction/mappers/airports.mapper';
import { AirportDTO } from '@core/dtos/airport.dto';

@Injectable({
  providedIn: 'root'
})
export class AirportsFacadeService {

  private airportService = inject(AirportsService);
  private AirportsMapper = new AirportsMapper();

  constructor() { }

  getAirports(): Observable<Airport[]> {
    return this.airportService.getAirports().pipe(
      map((dto: AirportDTO) => this.AirportsMapper.toDomain(dto))
    );
  }

}
