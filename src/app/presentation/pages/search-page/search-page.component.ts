import { Component, inject, OnInit } from '@angular/core';
import { SearchFormComponent } from '@presentation/components/search-form/search-form.component';
import { AirportsFacadeService } from '@abstraction/facades/airports/airports-facade.service';
import { Observable } from 'rxjs';
import Airport from '@core/models/airport.model';
import { AsyncPipe } from '@angular/common';
import { SearchFacadeService } from '@app/abstraction/facades/search/search-facade.service';

@Component({
  selector: 'search-page',
  standalone: true,
  imports: [SearchFormComponent, AsyncPipe],
  providers: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export default class SearchPageComponent implements OnInit {

  private airportFacadeService = inject(AirportsFacadeService);
  private searchFacadeService = inject(SearchFacadeService);

  airports$: Observable<Airport[]> | null = null;
  passengerOptions: number[] = []

  ngOnInit(): void {
    this.airports$ = this.airportFacadeService.getAirports()
    this.passengerOptions = this.searchFacadeService.getPassengerOptionsList();
  }
  

}
