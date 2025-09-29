import Seat from "../models/seat.model";

export class SeatsBusinessRules {

  constructor() { }

  validateSeatSelection(seatsNumber: number, requiredPassengersNumber: number){
    if(requiredPassengersNumber != seatsNumber){
      const ERROR0 = new Error('You must select the seats for all passengers to continue.')
      ERROR0.name = "E_S0";
      throw ERROR0;
    }
  }

  validateSeatsContent(seats: Seat[]){
    seats.forEach((seat)=>{
      if(!seat.passenger || !seat.price || !seat.flightNumber || !seat.seatNumber){
        const ERROR1 = new Error('You must select the seats for all passengers to continue.')
        ERROR1.name = "E_S1";
        throw ERROR1;
      }
    })
  }


}
