import { Injectable, Pipe, PipeTransform } from '@angular/core';
import Airport from '@app/core/models/airport.model';

@Pipe({
  name: 'inputAirportFormat',
  standalone: true
})

@Injectable({ providedIn: 'root' })
export default class InputAirportFormatPipe implements PipeTransform {

  transform(airport: Airport | null | undefined): string {
      if (!airport) return '';
      return `${airport.city} (${airport.code})`;
  }
}
