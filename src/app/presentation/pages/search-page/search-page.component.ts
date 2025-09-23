import { Component, inject, OnInit } from '@angular/core';
import { SearchFormComponent } from '@presentation/components/search-form/search-form.component';
import { AirportsFacadeService } from '@abstraction/facades/airports/airports-facade.service';
import { Observable } from 'rxjs';
import Airport from '@core/models/airport.model';
import { AsyncPipe } from '@angular/common';
import { SearchFacadeService } from '@app/abstraction/facades/search/search-facade.service';
import { SearchCriteria } from '@app/core/models/search-criteria.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'search-page',
  standalone: true,
  imports: [SearchFormComponent, AsyncPipe, MatChipsModule, MatIconModule, MatButtonModule],
  providers: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export default class SearchPageComponent implements OnInit {

  private _airportFacadeService = inject(AirportsFacadeService);
  private _searchFacadeService = inject(SearchFacadeService);

  airports$: Observable<Airport[]> | undefined;
  currentSearch$: Observable<SearchCriteria | null> | null = null;
  passengerOptions: number[] = []

  ngOnInit(): void {
    this.airports$ = this._airportFacadeService.getAirports()
    this.passengerOptions = this._searchFacadeService.getPassengerOptionsList();
    this.currentSearch$ = this._searchFacadeService.getSearchObservable();
  }

  onSearch(seachParams: SearchCriteria){
    this._searchFacadeService.searchFlights(seachParams);
  }

  deleteRecentSearch(){
    this._searchFacadeService.clearSearch();
  }
  

}
