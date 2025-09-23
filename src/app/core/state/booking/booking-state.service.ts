import { Injectable } from '@angular/core';
import Booking from '@core/models/booking.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {

  private bookingState$ = new BehaviorSubject<Booking | null>(null);
  booking$ = this.bookingState$.asObservable()

  setBookingState(booking: Booking | null){
      this.bookingState$.next(booking);
  }
  
  getBookingState(){
      return this.bookingState$.getValue();
  }
}
