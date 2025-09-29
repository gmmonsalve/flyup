import Passenger from "./passenger.model";

export default interface Seat{
    flightNumber: string;
    seatNumber: string;
    passenger?: Passenger;
    seatClass: 'ECONOMY' | 'FIRST' | 'PLUS' | 'EMERGENCY' ;
    price: number;
    isAvailable: boolean;
}