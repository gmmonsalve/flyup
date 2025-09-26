import { inject, Injectable } from '@angular/core';
import { BookingFacadeService } from '../booking/booking-facade.service';
import { PassengerFormValues } from '@app/presentation/models/passenger-form.vmodel';
import Passenger from '@app/core/models/passenger.model';
import User from '@app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PassengersFacadeService {

  private _bookingFacade = inject(BookingFacadeService);

  addPassengers(formValue: PassengerFormValues): void{
    //business validation
    //mapper para ambos objetos
    const { email, prefix, phone } = formValue.bookingHolder
    const passengerInfo: Passenger = formValue.bookingHolder.passenger as unknown as Passenger
    const bookingHolder: User = {
      ...passengerInfo,
      email,
      prefix,
      phoneNumber: phone

    } as User;
    const passengersList: Passenger[] = formValue.passengers as Passenger[];
    this._bookingFacade.addPassengers(passengersList, bookingHolder)
  }

}