import Seat from '../models/seat.model';
import Flight from '../models/flight.model';
import Booking from '../models/booking.model';

export class PricingBusinessRules {

  constructor() { }

  calculateTotalSeatsPrice(seats: Seat[]): number {
    return seats.reduce((total, seat)=> {
      total += seat.price;
      return total;
    },0)
  }

  calculateTotalFlightPrice(flights: Flight[], passengerNumber: number): number {
    return (flights.reduce((total, flight)=> {
      total += flight.price;
      return total;
    },0)) * passengerNumber;
  }

  calculateBookingPrice(booking: Booking | null, passengerNumber: number): number {
    if(!booking || !passengerNumber) return 0;
    const seatsPrice = this.calculateTotalSeatsPrice(booking.selectedSeats);
    const flightsPrice = this.calculateTotalFlightPrice(booking.flights, passengerNumber);
    return seatsPrice + flightsPrice;
  }
}
