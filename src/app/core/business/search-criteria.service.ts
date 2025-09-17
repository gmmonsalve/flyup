import { Injectable } from '@angular/core';
import { SearchCriteria } from '../models/search-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class SearchCriteriaService {

  constructor() { }

  validateSearchCriteria(searchCriteria: SearchCriteria): void {
    if(searchCriteria.passengers > 9) {
      throw new Error('A maximum of 9 passengers is allowed per booking.');
    }
  }
}
