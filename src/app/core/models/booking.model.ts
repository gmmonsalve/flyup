import Flight from "./flight.model";
import Passenger from "./passenger.model";
import Seat from "./seat.model";
import User  from "./user.model";

export default interface Booking{
    bookingHolder?: User;
    passengers: Passenger[];
    flights: Flight[];
    selectedSeats: Seat[];
    totalPrice: number;
    status: 'FLIGHT_SELECTION'| 'FLIGHT_SELECTED' | 'PASSENGER_SELECTED' | 'SEATS_SELECTED' | 'BOOKED';
    tripType: 'one-way' | 'round-trip';
}