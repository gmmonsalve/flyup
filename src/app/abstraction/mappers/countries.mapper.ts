import { ToDomainMapper } from "@abstraction/interfaces/mapper.interface";
import Country from "@core/models/country.model";
import { CountriesDTO } from "@core/dtos/country.dto";

export default class CountriesMapper implements ToDomainMapper<Country[], CountriesDTO> {

    toDomain(dto: CountriesDTO): Country[] {
        const data = dto.countries;
        return data.map(dto => {
            const { code, name, prefix } = dto;
            return {
                code,
                name,
                prefix
            }
        });
    }
   
}