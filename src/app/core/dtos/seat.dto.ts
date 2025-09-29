export default interface SeatsDTO{
    data: {
        firstClass: SeatDTO[],
        plus: SeatDTO[],
        emergency: SeatDTO[],
        economy: SeatDTO[],
    },
    meta: {
        lastUpdated: string;
    }
}

interface SeatDTO{
    flightNumber: string,
    seatNumber: string,
    seatClass: 'ECONOMY' | 'FIRST' | 'PLUS' | 'EMERGENCY',
    price: number,
    isAvailable: boolean
}