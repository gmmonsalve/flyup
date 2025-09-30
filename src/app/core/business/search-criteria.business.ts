import { SearchCriteria } from '@core/models/search-criteria.model';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';
import BookingRulesConfig from '@core/business/interfaces/bookingRulesConfig.interface';
import { inject } from '@angular/core';
import { Error } from '@core/business/interfaces/error-bussiness.interface';

export class SearchCriteriaRules{

  private rules = inject<BookingRulesConfig>(BOOKING_RULES); 
 

  constructor() { }

  validateSearchCriteria(searchCriteria: SearchCriteria){

    const MAX_PASSENGERS = this.getMaxPassengerValue()

    if(searchCriteria.passengers > MAX_PASSENGERS) {
      throw new Error("A maximum of 9 passengers is allowed per booking.");
    }

    if(searchCriteria.origin.code == searchCriteria.destination.code){
      throw new Error( "Origin and Destination must be different.");
    }

    if(searchCriteria.tripType == 'round-trip' && searchCriteria.returnDate){
      if(searchCriteria.departureDate.getTime() > searchCriteria.returnDate?.getTime()){
         throw new Error( "Return date must be greater than departure date.");
      }
    }
  }

  getMaxPassengerValue(): number{
    return this.rules.MAX_PASSENGERS
  }


}
