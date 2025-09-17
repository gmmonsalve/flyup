import Airport from "./airport.model";

export interface SearchCriteria{
    origin: Airport;
    destination: Airport;
    departureDate: Date;
    returnDate?: Date;
    passengers: number;
    tripType: 'one-way' | 'round-trip';
}