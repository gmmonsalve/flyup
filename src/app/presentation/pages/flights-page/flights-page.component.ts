import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsFacadeService } from '@app/abstraction/facades/flights/flights-facade.service';
import Flight from '@app/core/models/flight.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FlightCardComponent } from "@app/presentation/components/flight-card/flight-card.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SearchParams } from '@app/presentation/models/search-params.vmodel';
import { MatDividerModule } from '@angular/material/divider';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import Booking from '@app/core/models/booking.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'flights-page',
  standalone: true,
  imports: [AsyncPipe, FlightCardComponent, MatExpansionModule, MatIconModule, MatDividerModule, MatCardModule],
  templateUrl: './flights-page.component.html',
  styleUrl: './flights-page.component.scss'
})
export default class FlightsPageComponent implements OnInit, OnDestroy{

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _flightFacade: FlightsFacadeService = inject(FlightsFacadeService);
  private _bookingFacade: BookingFacadeService = inject(BookingFacadeService);
  private _router: Router = inject(Router);
  flights$: Observable<Flight[]> | undefined;
  booking: Booking | null = null;
  currentSearch: SearchParams | null = null;
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this._route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params)=>{ 
      this.showFlightResults(params as SearchParams);
      this.currentSearch = params as SearchParams;
      this._bookingFacade.resetBookingState();
    });
    this._bookingFacade.getBookingObservable().pipe(
      takeUntil(this.destroy$)
    ).subscribe((booking)=>{ 
      this.booking = booking;
      this.handleFlightSelectionStatus(booking)
    })
  }

  showFlightResults(searchParams: SearchParams, isReturnFlight: boolean = false){ 
    this.flights$ = this._flightFacade.showFlightsResult(searchParams, isReturnFlight);
  }

  onSelected(flight: Flight): void{
    this._bookingFacade.addFlight(flight);
  }

  handleFlightSelectionStatus(booking: Booking | null){
    if(!booking) return;
    switch(booking.status){
      case 'FLIGHT_SELECTION':
          this.showFlightResults(this.currentSearch!, true);
      break;
      case 'FLIGHT_SELECTED':
          this.redirectToResume()
      break;
    }
  }

  redirectToResume(): void{
    this._router.navigate(['booking/flights-resume'], { queryParams: this.currentSearch })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
