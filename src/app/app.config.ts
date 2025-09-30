import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BOOKING_RULES } from '@core/business/constants/bussiness.constants';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: BOOKING_RULES,
      useValue: environment.config
    }
  ]
};
