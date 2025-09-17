import { Injectable } from '@angular/core';
import Booking from '../models/booking.model';
import Seat from '../models/seat.model';
import Flight from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor() { }

  calculateTotalSeatsPrice(seats: Seat[]): number {
    return seats.reduce((total, seat)=> {
      total += seat.price;
      return total;
    },0)
  }

  calculateTotalFlightPrice(flights: Flight[]): number {
    return flights.reduce((total, flight)=> {
      total += flight.price;
      return total;
    },0)
  }

  calculateBookingPrice(booking: Booking): number {
    const seatsPrice = this.calculateTotalSeatsPrice(booking.selectedSeats);
    const flightsPrice = this.calculateTotalFlightPrice(booking.flights);
    return seatsPrice + flightsPrice; //pendiente implementar taxes
  }
}
