import { Pipe, PipeTransform } from '@angular/core';
import Passenger from '@app/core/models/passenger.model';

@Pipe({
  name: 'passengerInitials',
  standalone: true
})
export class PassengerInitialsPipe implements PipeTransform {

  transform(passenger: Passenger | undefined): unknown {
    if(!passenger) return null;
    const firstInitial = passenger.firstName.charAt(0);
    const secondInitial = passenger.lastName.charAt(0);
    if(!firstInitial || !secondInitial) return null;
    return firstInitial + secondInitial;
  }

}
