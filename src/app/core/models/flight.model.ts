
export default interface Flight{
    flightNumber: string;
    origin: {
        code: string,
        city: string
    };
    destination: {
        code: string,
        city: string
    };
    departureDate: {date: string, time: string};
    arrivalDate: {date: string, time: string};
    duration: string;
    price: number;
}