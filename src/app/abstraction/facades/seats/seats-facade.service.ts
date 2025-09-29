import { inject, Injectable } from '@angular/core';
import SeatsByClassMapper from '@app/abstraction/mappers/seats.mapper';
import { PricingBusinessRules } from '@app/core/business/pricing.business';
import Seat from '@app/core/models/seat.model';
import { SeatsByClassVM } from '@app/presentation/models/seats-classes.vmodel';
import { SeatsApiService } from '@core/services/api/seats-api.service';
import { map, Observable } from 'rxjs';
import { BookingStateService } from '@app/core/state/booking/booking-state.service';
import { BookingRules } from '@app/core/business/booking.business';
import Booking from '@app/core/models/booking.model';
import Passenger from '@app/core/models/passenger.model';
import { SeatsBusinessRules } from '@app/core/business/seats.business';
import Flight from '@app/core/models/flight.model';

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
      if(error.name == 'E_S1'){
        window.alert(error)
      }
      console.error(error)
    }
    return false;
  }


}
