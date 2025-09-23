export interface SearchParams{
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string | null;
    numberPassengers: number;
    tripType: 'one-way' | 'round-trip';
}