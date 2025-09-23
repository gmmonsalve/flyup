export interface SearchDTO{
    origin: string;
    destination: string;
    departureDate: string;
    numberPassengers: number;
}

export interface SearchResultDTO{
    data: {
        origin: {
            iataCode: string,
            city: string,
        };
        destination: {
            iataCode: string,
            city: string,
        };
        flights:{
            id: string,
            departureDate: {date: string, time: string};
            arrivalDate: {date: string, time: string};
            duration: string;
            price: number;
        }[]
    }
}