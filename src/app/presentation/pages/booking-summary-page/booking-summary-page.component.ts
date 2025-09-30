import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BookingFacadeService } from '@abstraction/facades/booking/booking-facade.service';
import { FlightCardComponent } from "@presentation/components/flight-card/flight-card.component";
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlightsFacadeService } from '@abstraction/facades/flights/flights-facade.service';
import Booking from '@core/models/booking.model';
import { SeatsFacadeService } from '@app/abstraction/facades/seats/seats-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-summary-page',
  standalone: true,
  imports: [MatCardModule, FlightCardComponent, 
            MatDividerModule, MatIconModule, MatExpansionModule, MatAccordion, CurrencyPipe, MatButtonModule, DatePipe],
  templateUrl: './booking-summary-page.component.html',
  styleUrl: './booking-summary-page.component.scss'
})
export default class BookingSummaryPageComponent implements OnInit{

  private _bookingFacade = inject(BookingFacadeService);
  private _flightFacade = inject(FlightsFacadeService);
  private _seatFacade = inject(SeatsFacadeService);
  private _router = inject(Router);

  iconsName: string[] = ['flight_takeoff','flight_land'];
  totalBookingPrice: number = 0;
  totalPricesInfo = {
    totalBooking: 0,
    totalFlights: 0,
    totalSeats: 0
  };
  panelOpenState: boolean = true;
  booking: Booking | null = null;

  ngOnInit(): void {
    this.booking = this._bookingFacade.getBookingState();
    this.setTotalPrices(this.booking!)
    console.log(this.booking);
  }

  setTotalPrices(booking: Booking){
    this.totalPricesInfo = {
      totalBooking: this._bookingFacade.calculateTotalBooking(),
      totalFlights: this._flightFacade.calculateTotalFlightsPrice(booking.flights, booking.passengers.length),
      totalSeats: this._seatFacade.getTotalSeatsPrice(booking.selectedSeats)
    }
  }

  confirmBooking(){
    this._bookingFacade.saveBooking().subscribe((value)=>{
        this._bookingFacade.changeStatus('BOOKED');
        this._router.navigate(['/booking/confirmation'], { queryParams: { bookingId: value.id } })
    });
  }

}