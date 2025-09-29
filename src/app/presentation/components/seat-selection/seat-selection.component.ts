import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SeatsByClassVM } from '@app/presentation/models/seats-classes.vmodel';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import Seat from '@app/core/models/seat.model';
import { PassengerInitialsPipe } from '@app/shared/pipes/passenger-initials.pipe';

@Component({
  selector: 'seat-selection',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatIconModule, PassengerInitialsPipe],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.scss'
})
export class SeatSelectionComponent {
  @Input() seats: SeatsByClassVM | null = null;
  @Input() seatTofill: Seat | null = null;
  @Output() selectedSeat: EventEmitter<Seat> = new EventEmitter<Seat>;
  currentSelectedSeat: Seat | undefined;

  onSelectedSeat(seat: Seat){
    if(!seat.isAvailable) return;
    if(!this.seatTofill?.passenger) return;
    this.unselectPreviousPassengerSeat();
    seat.passenger = this.seatTofill?.passenger;
    this.currentSelectedSeat = seat;
    this.selectedSeat.emit(seat);
    seat.isAvailable = false;
  }
  
  unselectPreviousPassengerSeat(): void{
    const previousSelection =  this.getPreviousSelection();
    if(!previousSelection) return;
    previousSelection.passenger = undefined;
    previousSelection.isAvailable = true;
  }

  getPreviousSelection(){
    const classTypesProp = this.seatTofill?.seatClass.toLowerCase() as 'first'| 'economy' | 'plus' | 'emergency';
    return this.seats![classTypesProp].filter((currentSeat)=> JSON.stringify(currentSeat?.passenger) == JSON.stringify(this.seatTofill?.passenger))[0];
  }
}
