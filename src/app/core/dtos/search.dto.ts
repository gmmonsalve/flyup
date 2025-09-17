export interface SearchDTO{
    origin: {
        iataCode: string,
        countryName: string
    }
    destination: {
        iataCode: string,
        countryName: string
    }
    departureDate: string;
    returnDate?: string;
    numberPassengers: number;
    tripType: 'one-way' | 'round-trip';
}