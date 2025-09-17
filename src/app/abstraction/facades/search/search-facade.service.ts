import { inject, Injectable } from '@angular/core';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';
import BookingRulesConfig from '@core/business/interfaces/bookingRulesConfig.interface';
import { FlightsApiService } from '@core/services/flights-api.service';
import { SearchCriteria } from '@core/models/search-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class SearchFacadeService {

  private flightService = inject(FlightsApiService);
  private rules = inject<BookingRulesConfig>(BOOKING_RULES); 

  constructor() { }

  searchFlights(searchCriteria: SearchCriteria): any {
    this.flightService.searchFligths(searchCriteria);
  }

  getPassengerOptionsList(): number[] {
    return Array.from({ length: this.rules.MAX_PASSENGERS }, (_, i)=> i + 1);
  }


}
