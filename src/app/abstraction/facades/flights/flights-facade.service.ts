import { inject, Injectable } from '@angular/core';
import { FlightsApiService } from '@core/services/api/flights-api.service';
import { map, Observable } from 'rxjs';
import { FlightSearchMapper } from '@abstraction/mappers/flight.mapper';
import { SearchParams } from '@presentation/models/search-params.vmodel';
import Flight from '@core/models/flight.model';
import { SearchDTO } from '@app/core/dtos/search.dto';

@Injectable({
  providedIn: 'root'
})
export class FlightsFacadeService {
  
  private _flightService = inject(FlightsApiService);
  private _flightSearchMapper = new FlightSearchMapper();

  constructor() { }

  showFlightsResult(searchParams: SearchParams, isReturnFlight: boolean = false): Observable<Flight[]>{
    const { origin, destination, departureDate, returnDate, numberPassengers } = searchParams;
    let searchDTO: SearchDTO = {
      origin, destination, departureDate, numberPassengers
    }
    if(isReturnFlight && returnDate){
      searchDTO.origin = destination;
      searchDTO.destination = origin;
      searchDTO.departureDate = returnDate;
    }
    return this.getFlightsResult(searchDTO);
  }

  getFlightsResult(searchDTO: SearchDTO): Observable<Flight[]>{
    return this._flightService.getFlights(searchDTO).pipe(
      map(this._flightSearchMapper.toDomain.bind(this))
    )
  }

}
