import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingFacadeService } from '@app/abstraction/facades/booking/booking-facade.service';
import { map } from 'rxjs';

export const bookingGuard: CanActivateFn = (route, state) => {
   const _bookingFacade = inject(BookingFacadeService);
   const router = inject(Router);
    return _bookingFacade.getBookingObservable().pipe(
        map((booking)=>{
            if(booking) return true;
            router.navigate(['/']);
            return false;
        })
    )
};
