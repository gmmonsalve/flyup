import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subscription } from 'rxjs';
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe } from '@angular/common';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import { SearchFacadeService } from '@app/abstraction/facades/search/search-facade.service';

@Component({
  selector: 'booking-confirmation-page',
  standalone: true,
  imports: [MatCardModule, AsyncPipe],
  templateUrl: './booking-confirmation-page.component.html',
  styleUrl: './booking-confirmation-page.component.scss'
})
export default class BookingConfirmationPageComponent implements OnInit, OnDestroy{
 
  private _route = inject(ActivatedRoute);
  private _bookingFacade = inject(BookingFacadeService);
  private _searchFacade = inject(SearchFacadeService);

  bookingId$: Observable<string> | undefined;

  ngOnInit(): void {
    this.bookingId$ = this._route.queryParams.pipe(
      map((params)=>params['bookingId'])
    )
  }

  ngOnDestroy(): void {
   this._bookingFacade.resetBookingState();
   this._searchFacade.clearSearch();
  }
}
