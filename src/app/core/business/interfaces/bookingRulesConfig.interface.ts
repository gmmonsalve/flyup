export default interface BookingRulesConfig {
    MAX_PASSENGERS: number,
    MIN_PASSENGERS: number,
    ONE_WAY_FLIGHT_NUMBER: number,
    ROUND_TRIP_FLIGHT_NUMBER: number,
    TRIP_TYPE: {
        oneWay: string,
        roundTrip: string
    }
} 