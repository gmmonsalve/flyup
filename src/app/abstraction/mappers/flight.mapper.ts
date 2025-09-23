import { ToDomainMapper } from "@abstraction/interfaces/mapper.interface";
import Flight from "@app/core/models/flight.model";
import { SearchResultDTO } from "@app/core/dtos/search.dto";

export class FlightSearchMapper implements ToDomainMapper<Flight[], SearchResultDTO> {
   
    toDomain(searchResultDTO: SearchResultDTO): Flight[] {
      const { origin, destination, flights } = searchResultDTO.data

      return flights.map((flight)=>{
        const { departureDate, arrivalDate, duration, price } = flight;
        return {
          flightNumber: flight.id,
          origin: {
            code: origin.iataCode,
            city: origin.city
          },
          destination: {
            code: destination.iataCode,
            city: destination.city
          },
          departureDate,
          arrivalDate,
          duration,
          price
        }
      })
       
    }
   
}