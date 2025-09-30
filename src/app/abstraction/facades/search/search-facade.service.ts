import { inject, Injectable } from '@angular/core';
import { SearchCriteria } from '@core/models/search-criteria.model';
import { SearchCriteriaRules } from '@app/core/business/search-criteria.business';
import { SearchParamsMapper } from '@app/abstraction/mappers/search.mapper';
import { SearchParams } from '@app/presentation/models/search-params.vmodel';
import { SearchStateService } from '@core/state/search/search-state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFacadeService {

  private rules = new SearchCriteriaRules();
  private _searchParamsMapper = new SearchParamsMapper();
  private _searchCriteriaStore = inject(SearchStateService);
  private _searchState = inject(SearchStateService);

  getPassengerOptionsList(): number[] {
    const MAX_PASSENGERS = this.rules.getMaxPassengerValue();
    return Array.from({ length: MAX_PASSENGERS }, (_, i)=> i + 1);
  }

  isValidSearchCriteria(searchCriteria: SearchCriteria): boolean{ 
    try{
      this.rules.validateSearchCriteria(searchCriteria);
      return true;
    }catch(err){
      window.alert(err);
    }
    return false;
  }

  getSearchParams(searchCriteria: SearchCriteria): SearchParams | null{
    const isValid = this.isValidSearchCriteria(searchCriteria);
    if(isValid){
      return this._searchParamsMapper.toDTO(searchCriteria);
    };
    return null;
  }

  setSearchCriteria(searchCriteria: SearchCriteria){
    this._searchCriteriaStore.setCriteria(searchCriteria);
  }

  getSearchObservable(): Observable<SearchCriteria | null>{
    return this._searchState.criteria$;
  }

  clearSearch(){
    this._searchState.setCriteria(null);
  }

}
