import { Injectable } from '@angular/core';
import Booking from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  validateBookingDetails(booking: Booking): void {
    if(booking.passengers.length < 1) {
      throw new Error('At least one passenger is required to proceed with the booking.');
    }

    if(booking.flights.length < 1) {
      throw new Error('At least one flight must be selected to proceed with the booking.');
    }

    if(booking.selectedSeats.length !== booking.passengers.length) {
      throw new Error('The number of selected seats must match the number of passengers.');
    }

  }


}
/* Booking{
    bookingOwner: User;
    passengers: Passenger[];
    flights: Flight[];
    selectedSeats: Seat[];
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    tripType: 'one-way' | 'round-trip'
} */