import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchCriteria } from '@core/models/search-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchCriteria$ = new BehaviorSubject<SearchCriteria | null>(null);
  criteria$ = this.searchCriteria$.asObservable()

  setCriteria(searchCriteria: SearchCriteria | null){
    this.searchCriteria$.next(searchCriteria);
  }

  getCriteria(){
    return this.searchCriteria$.getValue();
  }
}
