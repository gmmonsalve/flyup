import { SearchCriteria } from "@app/core/models/search-criteria.model";
import { ToDTOMapper } from "@abstraction/interfaces/mapper.interface";
import { SearchDTO } from "@app/core/dtos/search.dto";
import { SearchParams } from "@app/presentation/models/search-params.vmodel";

export class SearchMapper implements ToDTOMapper<SearchCriteria, SearchDTO>  {
   
    toDTO(domain: SearchCriteria): SearchDTO {
        const { origin, destination, departureDate, passengers } = domain
        return {
            origin: origin.code,
            destination: destination.code,
            departureDate:  departureDate.toISOString().split('T')[0],
            numberPassengers: passengers
        }
    }
   
}

export class SearchParamsMapper implements ToDTOMapper<SearchCriteria, SearchParams>  {
   
    toDTO(domain: SearchCriteria): SearchParams {
        const { origin, destination, departureDate, passengers, returnDate, tripType } = domain
        return {
            origin: origin.code,
            destination: destination.code,
            departureDate:  departureDate.toISOString().split('T')[0],
            returnDate: returnDate?.toISOString().split('T')[0] || null,
            numberPassengers: passengers,
            tripType: tripType
        }
    }
   
}

