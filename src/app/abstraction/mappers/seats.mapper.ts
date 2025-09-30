
import { ToDomainMapper, ToDTOMapper } from "@abstraction/interfaces/mapper.interface";
import SeatsDTO, { SeatBookingDTO } from "@app/core/dtos/seat.dto";
import Seat from "@app/core/models/seat.model";
import { SeatsByClassVM } from "@app/presentation/models/seats-classes.vmodel";

export class SeatsByClassMapper implements ToDomainMapper<SeatsByClassVM, SeatsDTO> {

    toDomain(dto: SeatsDTO): SeatsByClassVM {
        const data = dto.data;
        const { firstClass: first, plus, economy, emergency } = data 
        return {
            first,
            plus,
            economy,
            emergency
        }
    }
}

export class SeatsBookingDTOMapper implements ToDTOMapper<Seat[], SeatBookingDTO[]>{

    toDTO(domain: Seat[]): SeatBookingDTO[] {
        return domain.map((seat)=>{
            const { seatNumber, seatClass } = seat
            return {
                flightId: seat.flightNumber,
                seatNumber,
                seatClass
            }
        })
    }

}

