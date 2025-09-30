import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookingFacadeService } from '@abstraction/facades/booking/booking-facade.service';
import { FlightCardComponent } from "@presentation/components/flight-card/flight-card.component";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchParams } from '@presentation/models/search-params.vmodel';
import { Subscription } from 'rxjs';
import Booking from '@core/models/booking.model';
import { FlightsFacadeService } from '@app/abstraction/facades/flights/flights-facade.service';

@Component({
  selector: 'flights-resume',
  standalone: true,
  imports: [FlightCardComponent, CurrencyPipe, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './flights-resume-page.component.html',
  styleUrl: './flights-resume-page.component.scss'
})
export default class FlightsResumePageComponent implements OnInit, OnDestroy{
  private _bookingFacade = inject(BookingFacadeService);
  private _fligthsFacade = inject(FlightsFacadeService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  totalPrice: number = 0;
  booking: Booking | null = null;
  searchParams: SearchParams | null = null;
  route$: Subscription | undefined;

  ngOnInit(): void {
    this.booking = this._bookingFacade.getBookingState();
    this.route$ = this._route.queryParams.subscribe((queryParams)=>{
      this.searchParams = queryParams as SearchParams;
    })
    this.totalPrice = this._fligthsFacade.calculateTotalFlightsPrice(this.booking!.flights ,this.searchParams!.numberPassengers);
  }

  redirectToPassengerSelection(): void{
    this._router.navigate(['/booking/passengers'], { queryParams: this.searchParams })
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
