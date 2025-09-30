import Passenger from "@app/core/models/passenger.model";
import { ToDTOMapper } from "../interfaces/mapper.interface";
import PassengerDTO from "@app/core/dtos/passenger.dto";

export class PassengersDTOMapper implements ToDTOMapper<Passenger[], PassengerDTO[]>{


    toDTO(domain: Passenger[]): PassengerDTO[] {
    return domain.map((passenger)=>{
            const { firstName, lastName, nationality, gender, birthDate} = passenger;                
            return {
                firstName, lastName, 
                nationality, gender,
                birthDate: birthDate.toISOString().split('T')[0] 
            } 
        })
    }

    
}