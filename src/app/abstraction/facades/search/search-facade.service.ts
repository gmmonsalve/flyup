import { inject, Injectable } from '@angular/core';
import { SearchCriteria } from '@core/models/search-criteria.model';
import { SearchCriteriaRules } from '@app/core/business/search-criteria.business';
import { Router } from '@angular/router';
import { SearchParamsMapper } from '@app/abstraction/mappers/search.mapper';
import { SearchParams } from '@app/presentation/models/search-params.vmodel';
import { SearchStateService } from '@core/state/search/search-state.service';
import { BookingStateService } from '@app/core/state/booking/booking-state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFacadeService {

  private rules = new SearchCriteriaRules();
  private _searchParamsMapper = new SearchParamsMapper();
  private _router = inject(Router);
  private _searchCriteriaStore = inject(SearchStateService);
  private _searchState = inject(SearchStateService);
  private _bookingState = inject(BookingStateService);

  constructor() { }

  getPassengerOptionsList(): number[] {
    const MAX_PASSENGERS = this.rules.getMaxPassengerValue();
    return Array.from({ length: MAX_PASSENGERS }, (_, i)=> i + 1);
  }

  isValidSearchCriteria(searchCriteria: SearchCriteria): boolean{ 
    const errors = this.rules.validateSearchCriteria(searchCriteria)
    if(!errors) return true
    return errors.length == 0
  }

  searchFlights(searchCriteria: SearchCriteria){
    const isValid = this.isValidSearchCriteria(searchCriteria);
    if(isValid){
      const searchParams: SearchParams = this._searchParamsMapper.toDTO(searchCriteria);
      this._searchCriteriaStore.setCriteria(searchCriteria);
      this._bookingState.setBookingState(null);
      this._router.navigate(['flights/search'], { queryParams: searchParams })
    };
  }

  getSearchObservable(): Observable<SearchCriteria | null>{
    return this._searchState.criteria$;
  }

  clearSearch(){
    this._searchState.setCriteria(null)
  }

}
