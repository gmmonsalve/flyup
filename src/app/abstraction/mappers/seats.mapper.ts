
import { ToDomainMapper } from "@abstraction/interfaces/mapper.interface";
import SeatsDTO from "@app/core/dtos/seat.dto";
import { SeatsByClassVM } from "@app/presentation/models/seats-classes.vmodel";

export default class SeatsByClassMapper implements ToDomainMapper<SeatsByClassVM, SeatsDTO> {

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