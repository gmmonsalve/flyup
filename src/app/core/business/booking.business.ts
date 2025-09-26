import { inject } from '@angular/core';
import Booking from '@core/models/booking.model';
import BookingRulesConfig from '@core/business/interfaces/bookingRulesConfig.interface';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';

export class BookingRules {

   private RULES = inject<BookingRulesConfig>(BOOKING_RULES); 

  validateBookingDetails(booking: Booking): void {
    if(booking.flights.length < 1) {
      throw new Error('At least one flight must be selected to proceed with the booking.');
    }

    if(booking.selectedSeats.length !== booking.passengers.length) {
      throw new Error('The number of selected seats must match the number of passengers.');
    }
  }

  validateNumberPassengers(booking: Booking){
    if(booking.passengers.length < 1) {
      throw new Error('At least one passenger is required to proceed with the booking.');
    }
  }

  isFlightSelectionComplete(booking: Booking | null): boolean{
    if(!booking) return false;
    if(booking.tripType == this.RULES.TRIP_TYPE.oneWay && booking.flights.length == this.RULES.ONE_WAY_FLIGHT_NUMBER) return true;
    if(booking.tripType == this.RULES.TRIP_TYPE.roundTrip && booking.flights.length == this.RULES.ROUND_TRIP_FLIGHT_NUMBER) return true;
    return false;
  }

}