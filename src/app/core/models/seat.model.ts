export default interface Seat{
    flightNumber: string;
    seatNumber: string;
    class: 'economy' | 'first' | 'plus' | 'emergency';
    price: number;
    isAvailable: boolean;
}