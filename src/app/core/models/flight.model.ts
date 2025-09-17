import Airport from "./airport.model";
import Seat from "./seat.model";

export default interface Flight{
    flightNumber: string;
    origin: Airport;
    destination: Airport;
    departureDate: {date: string, time: string};
    duration: string;
    fare: 'basic' | 'standard' | 'flex';
    price: number;
    seats: Seat[];
    //status: 'BOOKED' | 'ON_TIME' | 'DELAYED' | 'CANCELLED';//pensar que rol jugara esto podria eliminarse porque aca no se hace el checkin
}