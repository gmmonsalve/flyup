import Passenger from "./passenger.model";

export default interface User extends Passenger{
  email: string;
  prefix: string;
  phoneNumber: string;
}