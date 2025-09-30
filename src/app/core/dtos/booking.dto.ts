import FlightDTO from "./flight.dto";
import PassengerDTO from "./passenger.dto";
import { SeatBookingDTO } from "./seat.dto";
import UserDTO from "./user.dto";

export default interface BookingDTO{
    bookingHolder: UserDTO;
    passengers: PassengerDTO[];
    flights: FlightDTO[];
    selectedSeats: SeatBookingDTO[];
    tripType: 'one-way' | 'round-trip';
}