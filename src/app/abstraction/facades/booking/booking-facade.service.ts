import { inject, Injectable } from '@angular/core';
import { BookingRules } from '@app/core/business/booking.business';
import { PricingBusinessRules } from '@app/core/business/pricing.business';
import Booking from '@app/core/models/booking.model';
import Flight from '@app/core/models/flight.model';
import { SearchCriteria } from '@app/core/models/search-criteria.model';
import { BookingStateService } from '@app/core/state/booking/booking-state.service';
import { SearchStateService } from '@app/core/state/search/search-state.service';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingFacadeService {
 
  private _bookingStore: BookingStateService = inject(BookingStateService);
  private _searchStore: SearchStateService = inject(SearchStateService);
  private _bookingBusiness: BookingRules = new BookingRules();
  private _pricingBusiness = new PricingBusinessRules();

  addFlight(flight: Flight): void {
    let currentBooking = this._bookingStore.getBookingState();

    if (!currentBooking) {
      currentBooking = this.createBooking(flight);
    }
    
     const updatedBooking: Booking = {
      ...currentBooking,
      flights: [...currentBooking!.flights, flight],
    } as Booking;
   
    const isComplete = this._bookingBusiness.isFlightSelectionComplete(updatedBooking);

    if (isComplete) {
      updatedBooking.status = 'FLIGHT_SELECTED';
      this._bookingStore.setBookingState(updatedBooking);
      return;
    };
    
    this._bookingStore.setBookingState(updatedBooking);
  }

  createBooking(flight: Flight): Booking | null{
    const searchCriteria: SearchCriteria | null  = this._searchStore.getCriteria();
    if(!searchCriteria) return null;
    const newBooking: Booking = {
      passengers: [],
      flights: [],
      selectedSeats: [],
      totalPrice: 0,
      status: 'FLIGHT_SELECTION',
      tripType: searchCriteria?.tripType
    }
    return newBooking;
  }

  getBookingObservable(): Observable<Booking | null>{
    return this._bookingStore.booking$
  }

  isCompleted(booking: Booking | null){
    return this._bookingBusiness.isFlightSelectionComplete(booking);
  }

 getTotalBooking(): number{
  const booking = this._bookingStore.getBookingState()
  const searchCriteria: SearchCriteria | null  = this._searchStore.getCriteria();
  if(!searchCriteria) return 0;
  return this._pricingBusiness.calculateBookingPrice(booking, searchCriteria.passengers)
 }


}
