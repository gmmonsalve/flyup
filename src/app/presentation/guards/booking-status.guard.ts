import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import { map } from 'rxjs';

export const bookingStatusGuard: CanActivateFn = (route, state) => {
   const _bookingFacade = inject(BookingFacadeService);
      return _bookingFacade.getBookingObservable().pipe(
          map((booking)=>{
              const requiredStatus = route.data['requiredStatus'];
              if(booking?.status == requiredStatus){
                return true;
              }
              return false;
          })
      )
};
