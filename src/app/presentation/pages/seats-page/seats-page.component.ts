import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import { PassengerSeatCardComponent } from '@app/presentation/components/passenger-seat-card/passenger-seat-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SeatSelectionComponent } from '@app/presentation/components/seat-selection/seat-selection.component';
import { SeatsFacadeService } from '@app/abstraction/facades/seats/seats-facade.service';
import { Observable } from 'rxjs';
import { SeatsByClassVM } from '@app/presentation/models/seats-classes.vmodel';
import Passenger from '@app/core/models/passenger.model';
import Flight from '@app/core/models/flight.model';
import { MatButtonModule } from '@angular/material/button';
import Seat from '@app/core/models/seat.model';
import Booking from '@app/core/models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'seats-page',
  standalone: true,
  imports: [PassengerSeatCardComponent, MatTabsModule, CommonModule, SeatSelectionComponent, MatButtonModule],
  templateUrl: './seats-page.component.html',
  styleUrl: './seats-page.component.scss'
})
export default class SeatsPageComponent implements OnInit {


  @ViewChild('seatSelectionPanel') seatSelectionPanel: SeatSelectionComponent | undefined;

  private _bookingFacade = inject(BookingFacadeService);
  private _seatsFacade = inject(SeatsFacadeService);
  private _router = inject(Router);

  seatsSelection: Seat[] = [];
  selectedPassengerIndex: number | undefined;
  selectedSeat: Seat | null = null;
  flightSeats$: Observable<SeatsByClassVM> | undefined;
  totalSeatsPrice: number = 0;
  selectedFlightIndex: number = 0;
  maxFlightIndex: number = 0;
  booking: Booking | null = null;

  ngOnInit(): void {
    this.booking = this._bookingFacade.getBookingState();
    this.initSeats();
    this.getSeatsByFlight();
    this.setMaxFlightIndex();
  }

  initSeats(): void{
   this.seatsSelection = this.booking?.flights.flatMap((flight)=>{
      return this.booking?.passengers.map((passenger)=> this.getNewSeat(flight, passenger));
    }) as Seat[];
  }

  getNewSeat(flight: Flight, passenger: Passenger): Seat{
    return {
      passenger,
      flightNumber: flight.flightNumber,
      price: 0,
      seatNumber: '',
      seatClass: 'ECONOMY',
      isAvailable: true
    }
  }

  setMaxFlightIndex(): void{
    this.maxFlightIndex = this.booking!.flights.length - 1;
  }

  setSelectedPassenger(index: number, seat: Seat | undefined): void{
    this.selectedPassengerIndex = index;
    this.selectedSeat = seat || null;
  }

  getSeatsByFlight(flightIndex: number = 0): void{
    const selectedflight = this.getSelectedFlightByIndex(flightIndex);
    if(!selectedflight) return;
    this.flightSeats$ = this._seatsFacade.getSeats(selectedflight.flightNumber);
  }

  getSelectedFlightByIndex(flightIndex: number = 0): Flight{
    return this.booking!.flights[flightIndex];
  }

  onSelectedSeat(seat: Seat): void{
    let selectedSeat = this.seatsSelection.find(currentSeat => (currentSeat.flightNumber == seat.flightNumber) && (currentSeat.passenger?.firstName == seat.passenger?.firstName));
    if (selectedSeat) {
      selectedSeat.price = seat.price; selectedSeat.seatNumber = seat.seatNumber; 
      selectedSeat.seatClass = seat.seatClass;
    }
    this.totalSeatsPrice = this._seatsFacade.getTotalSeatsPrice(this.seatsSelection);
  }

  onResetSeatSelection(seat: Seat): void{
    this.seatSelectionPanel?.unselectPreviousPassengerSeat();
    seat.price = 0; seat.seatClass = 'ECONOMY'; seat.seatNumber = '';
    this.totalSeatsPrice = this._seatsFacade.getTotalSeatsPrice(this.seatsSelection);
  }

  nextFlight(): void{
    const isvalidSelection = this.validateBeforeNext();
    if(!isvalidSelection) return;
    this.selectedFlightIndex += 1;
    this.getSeatsByFlight(this.selectedFlightIndex);
    this.selectedSeat = null; 
  }

  validateBeforeNext(): boolean{
    if(this.booking?.tripType == 'one-way') return false;
    if(this.booking?.tripType == 'round-trip' && this.selectedFlightIndex == 2) return false;
    const selectedflight = this.getSelectedFlightByIndex(this.selectedFlightIndex);
    return this._seatsFacade.verifyFlightSeatSelection(this.seatsSelection, this.booking!.passengers, selectedflight);
  }

  addsSeatToBooking(): void{
    this._bookingFacade.addBookingSeats(this.seatsSelection);
    this.redirectToBookingConfirmation();
  }

  redirectToBookingConfirmation(){
    this._router.navigate(['/booking/summary'])
  }

}
