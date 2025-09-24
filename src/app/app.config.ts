import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: BOOKING_RULES,
      useValue: {
        MAX_PASSENGERS: 9,
        MIN_PASSENGERS: 1,
        ONE_WAY_FLIGHT_NUMBER: 1,
        ROUND_TRIP_FLIGHT_NUMBER: 2,
        TRIP_TYPE: {
          oneWay: "one-way",
          roundTrip: "round-trip"
        }
      }
    }
  ]
};
