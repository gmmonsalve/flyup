import Passenger from "@app/core/models/passenger.model";
import { ToDomainMapper } from "../interfaces/mapper.interface";
import { PassengerFormValues } from "@app/presentation/models/passenger-form.vmodel";

export class PassengersMapper implements ToDomainMapper<Passenger, PassengerFormValues>{
    
    
    toDomain(data: PassengerFormValues): Passenger {
        throw new Error("Method not implemented.");
    }

    
}