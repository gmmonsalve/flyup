
import { AirportDTO } from "@core/dtos/airport.dto";
import Airport from "@core/models/airport.model";
import { ToDTOMapper } from "@abstraction/interfaces/mapper.interface";

export default class AirportsMapper implements ToDTOMapper<Airport[], AirportDTO> {

    toDomain(dto: AirportDTO): Airport[] {
        const data = dto.data;
        return data.map(dto => {
           return {
            code: dto.iata_code,
            name: dto.airport_name,
            city: dto.location_city,
            country: dto.location_country
           }
        });
    }
   
}