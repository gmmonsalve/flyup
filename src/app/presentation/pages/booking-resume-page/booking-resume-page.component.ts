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

@Component({
  selector: 'booking-resume',
  standalone: true,
  imports: [FlightCardComponent, CurrencyPipe, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './booking-resume-page.component.html',
  styleUrl: './booking-resume-page.component.scss'
})
export default class BookingResumePageComponent implements OnInit, OnDestroy{
  private _bookingFacade = inject(BookingFacadeService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  totalPrice: number = 0;
  booking: Booking | null = null;
  seachParams: SearchParams | null = null;
  route$: Subscription | undefined;

  ngOnInit(): void {
    this.booking = this._bookingFacade.getBookingState();
    this.totalPrice = this._bookingFacade.getTotalBooking();
    this.route$ = this._route.queryParams.subscribe((queryParams)=>{
      this.seachParams = queryParams as SearchParams;
    })
  }

  redirectToPassengerSelection(): void{
    this._router.navigate(['/booking/passengers'], { queryParams: this.seachParams })
  }
  
  /*
    TODO: edicion de vuelos (regresar al stage anterior)
  */

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
