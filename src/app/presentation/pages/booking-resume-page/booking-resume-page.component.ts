import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import Booking from '@app/core/models/booking.model';
import { BookingStateService } from '@app/core/state/booking/booking-state.service';
import { FlightCardComponent } from "@app/presentation/components/flight-card/flight-card.component";

@Component({
  selector: 'app-booking-resume',
  standalone: true,
  imports: [FlightCardComponent, CurrencyPipe, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './booking-resume-page.component.html',
  styleUrl: './booking-resume-page.component.scss'
})
export default class BookingResumePageComponent implements OnInit{
  private _bookingState = inject(BookingStateService);
  private _bookingFacade = inject(BookingFacadeService);

  totalPrice: number = 0;

  booking: Booking | null = null;

  ngOnInit(): void {
    this.booking = this._bookingState.getBookingState();
    this.totalPrice = this._bookingFacade.getTotalBooking()
  }
}
