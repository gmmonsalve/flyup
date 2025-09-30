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
import { SearchParams } from '@app/presentation/models/search-params.vmodel';
import { Router } from '@angular/router';


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
  private _router = inject(Router);

  airports$: Observable<Airport[]> | undefined;
  currentSearch$: Observable<SearchCriteria | null> | null = null;
  passengerOptions: number[] = []

  ngOnInit(): void {
    this.airports$ = this._airportFacadeService.getAirports()
    this.passengerOptions = this._searchFacadeService.getPassengerOptionsList();
    this.currentSearch$ = this._searchFacadeService.getSearchObservable();
  }

  onSearch(searchCriteria: SearchCriteria){
    const searchParams: SearchParams | null = this._searchFacadeService.getSearchParams(searchCriteria);
    if(!searchParams) return;
    this._searchFacadeService.setSearchCriteria(searchCriteria);
    this._router.navigate(['flights/search'], { queryParams: searchParams })
  }

  deleteRecentSearch(){
    this._searchFacadeService.clearSearch();
  }
  

}
