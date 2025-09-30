import { ToDTOMapper } from "@abstraction/interfaces/mapper.interface";
import { PassengersDTOMapper } from "./passengers.mapper";
import { FlightsToDTOMapper } from "./flight.mapper";
import { SeatsBookingDTOMapper } from "./seats.mapper";
import { UserToDTOMapper } from "./booking-holder.mapper";
import Booking from "@core/models/booking.model";
import BookingDTO from "@core/dtos/booking.dto";

export default class BookingMapper implements ToDTOMapper<Booking, BookingDTO> {

    toDTO(domain: Booking): BookingDTO {
        const { bookingHolder, passengers, flights, selectedSeats, tripType } = domain;
        const passengersMapper = new PassengersDTOMapper();
        const flightsMapper = new FlightsToDTOMapper();
        const seatsMapper = new SeatsBookingDTOMapper();
        const userMapper = new UserToDTOMapper();
        return {
            bookingHolder: userMapper.toDTO(bookingHolder!),
            passengers: passengersMapper.toDTO(passengers),
            flights: flightsMapper.toDTO(flights),
            selectedSeats: seatsMapper.toDTO(selectedSeats),
            tripType
        }
    } 
}