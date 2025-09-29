import Seat  from "@app/core/models/seat.model";

export type SeatClassVM = 'economy' | 'first' | 'plus' | 'emergency';

export type SeatsByClassVM = Record<SeatClassVM, Seat[]>;