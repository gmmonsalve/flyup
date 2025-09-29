import { Component, EventEmitter, Input, Output } from '@angular/core';
import Seat from '@app/core/models/seat.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PassengerInitialsPipe } from "../../../shared/pipes/passenger-initials.pipe";
import Passenger from '@app/core/models/passenger.model';

@Component({
  selector: 'passenger-seat-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CurrencyPipe, MatButtonModule, PassengerInitialsPipe],
  templateUrl: './passenger-seat-card.component.html',
  styleUrl: './passenger-seat-card.component.scss'
})
export class PassengerSeatCardComponent {

    @Input() seat: Seat | null = null;
    @Input() hideCloseButton: boolean = false;
    @Output() reset: EventEmitter<void> = new EventEmitter<void>();

    onCancelSelection(event: MouseEvent){
      event.stopPropagation();
      this.reset.emit();
    }
}
