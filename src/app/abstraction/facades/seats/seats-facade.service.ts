import { inject, Injectable } from '@angular/core';
import { SeatsByClassMapper } from '@abstraction/mappers/seats.mapper';
import { PricingBusinessRules } from '@core/business/pricing.business';
import { SeatsByClassVM } from '@presentation/models/seats-classes.vmodel';
import { SeatsApiService } from '@core/services/api/seats-api.service';
import { map, Observable } from 'rxjs';
import Passenger from '@core/models/passenger.model';
import { SeatsBusinessRules } from '@core/business/seats.business';
import Flight from '@core/models/flight.model';
import Seat from '@core/models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatsFacadeService {

  private _seatsService = inject(SeatsApiService);
  private _seatsByClassMapper = new SeatsByClassMapper();
  private _seatRules = new SeatsBusinessRules();
  private _pricingRules = new PricingBusinessRules();
 
  getSeats(flightNumber: string): Observable<SeatsByClassVM>{
    return this._seatsService.getAllSeatsByFlight(flightNumber)
    .pipe(
      map(this._seatsByClassMapper.toDomain.bind(this))
    );
  }

  getTotalSeatsPrice(seats: Seat[]): number{
    return this._pricingRules.calculateTotalSeatsPrice(seats);
  }

  verifyFlightSeatSelection(seats: Seat[], passengers: Passenger[], flight: Flight): boolean{
    const flightNumber = flight.flightNumber;
    const seatsByFlightNumber = seats.filter((seat)=> seat.flightNumber == flightNumber);

    try {
      this._seatRules.validateSeatSelection(seatsByFlightNumber.length, passengers.length);
      this._seatRules.validateSeatsContent(seatsByFlightNumber);
      return true;
    }catch(error: any){
      console.error(error)
    }
    return false;
  }


}
