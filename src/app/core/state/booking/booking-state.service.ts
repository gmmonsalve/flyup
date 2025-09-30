import { Injectable } from '@angular/core';
import Booking from '@core/models/booking.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {

  private bookingState$ = new BehaviorSubject<Booking | null>(null);
  booking$ = this.bookingState$.asObservable()

  setBookingState(booking: Booking | null): void {
    this.bookingState$.next(booking ? this.cloneBooking(booking) : null);
  }
  
  getBookingState(): Booking | null {
    const current = this.bookingState$.getValue();
    return current ? this.cloneBooking(current) : null;
  }

  private cloneBooking(booking: Booking): Booking {
    return {
      ...booking,
      passengers: [...booking.passengers],
      flights: [...booking.flights],
      selectedSeats: [...booking.selectedSeats],
    };
  }

}
