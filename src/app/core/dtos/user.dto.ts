import PassengerDTO from "./passenger.dto";

export default interface UserDTO extends PassengerDTO{
   email: string,
   phoneNumber: {prefix: string, cel: string}
}

