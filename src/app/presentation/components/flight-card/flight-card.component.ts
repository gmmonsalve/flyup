import { Component, EventEmitter, Input, Output } from '@angular/core';
import Flight from '@app/core/models/flight.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'flight-card',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  @Input() flight: Flight | undefined;
  @Input() selectable: boolean = true;
  @Output() selected: EventEmitter<Flight> = new EventEmitter<Flight>();

  onSelected($fligth: Flight | undefined): void{
    if(!$fligth) return;
    this.selected.emit($fligth)
  }

}
