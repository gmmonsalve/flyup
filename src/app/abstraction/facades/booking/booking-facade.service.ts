import { inject, Injectable } from '@angular/core';
import { BookingRules } from '@core/business/booking.business';
import { PricingBusinessRules } from '@core/business/pricing.business';
import { BookingStateService } from '@core/state/booking/booking-state.service';
import { SearchStateService } from '@core/state/search/search-state.service';
import { Observable } from 'rxjs';
import { SearchCriteria } from '@core/models/search-criteria.model';
import { BookingApiService } from '@core/services/api/booking-api.service';
import BookingMapper from '@abstraction/mappers/booking.mapper';
import BookingDTO from '@core/dtos/booking.dto';
import User from '@core/models/user.model';
import Passenger from '@core/models/passenger.model';
import Booking from '@core/models/booking.model';
import Flight from '@core/models/flight.model';
import Seat from '@core/models/seat.model';
import BookingRulesConfig from '@core/business/interfaces/bookingRulesConfig.interface';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';

@Injectable({
  providedIn: 'root'
})
export class BookingFacadeService {

  private rulesConfig = inject<BookingRulesConfig>(BOOKING_RULES);
  private _bookingStore: BookingStateService = inject(BookingStateService);
  private _searchStore: SearchStateService = inject(SearchStateService);
  private _bookingBusiness: BookingRules = new BookingRules(this.rulesConfig);
  private _pricingBusiness = new PricingBusinessRules();
  private _bookingApi = inject(BookingApiService);
  private _bookingMapper = new BookingMapper();

  addFlight(flight: Flight): void {
    let currentBooking = this._bookingStore.getBookingState();

    if (!currentBooking) {
      currentBooking = this.createBooking();
    }

    currentBooking?.flights.push(flight);
   
    const isComplete = this._bookingBusiness.isFlightSelectionComplete(currentBooking);

    if (isComplete) {
      currentBooking!.status = 'FLIGHT_SELECTED';
      this._bookingStore.setBookingState(currentBooking);
      return;
    };

    this._bookingStore.setBookingState(currentBooking);
  }

  createBooking(): Booking | null{
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
    return this._bookingStore.booking$;
  }

  getBookingState(): Booking | null {
  return this._bookingStore.getBookingState();
 }

  isFlightSelectionCompleted(booking: Booking | null){
    return this._bookingBusiness.isFlightSelectionComplete(booking);
  }

 calculateTotalBooking(): number{
    const booking = this._bookingStore.getBookingState();
    if(!booking) return 0;
    return this._pricingBusiness.calculateBookingPrice(booking);
 }


 addPassengers(passengers: Passenger[], user: User): void{
  const currentBooking: Booking | null = this._bookingStore.getBookingState();
  try{
    const newBookingState = {
      ...currentBooking, 
      passengers, 
      bookingHolder: user,
      status: 'PASSENGER_SELECTED'
    } as Booking;
    this._bookingStore.setBookingState(newBookingState);
    this._bookingBusiness.validateNumberPassengers(newBookingState);
  }catch(err){
    window.alert(err)
  };
 }

  addBookingSeats(seats: Seat[]){
    const currentBooking = this.getBookingState();
    const newState: Booking = {
      ...currentBooking,
      selectedSeats: seats,
      status: 'SEATS_SELECTED'
    } as Booking;

    try{
      this._bookingBusiness.validateSeatSelection(newState);
      this._bookingStore.setBookingState(newState);
    }catch(error){
      console.error(error)
    }
  }

  saveBooking(): Observable<any>{
    const currentBooking: Booking | null = this._bookingStore.getBookingState();
    const bookingDTO: BookingDTO = this._bookingMapper.toDTO(currentBooking!);
    return this._bookingApi.createBooking(bookingDTO);
  }

  changeStatus(status: 'FLIGHT_SELECTION'| 'FLIGHT_SELECTED' | 'PASSENGER_SELECTED' | 'SEATS_SELECTED' | 'BOOKED'){
    const currentBooking = this._bookingStore.getBookingState();
    currentBooking!.status = status;
    this._bookingStore.setBookingState(currentBooking);
  }

  resetBookingState(){
    this._bookingStore.setBookingState(null);
  }
 
 }


