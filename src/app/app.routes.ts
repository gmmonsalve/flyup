import { Routes } from '@angular/router';
import { bookingGuard } from './presentation/guards/booking.guard';
import { bookingStatusGuard } from './presentation/guards/booking-status.guard';

export const routes: Routes = [
    { path: '', loadComponent: ()=> import('@presentation/pages/search-page/search-page.component') },
    {
        path: 'flights/search',
        loadComponent: ()=> import('@presentation/pages/flights-page/flights-page.component'),
        data: { requiredStatus: 'FLIGHT_SELECTION' },
    },
    { path: 'booking', canMatch: [bookingGuard],
        children: [
            {   path: 'flights-resume', 
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@app/presentation/pages/flights-resume-page/flights-resume-page.component'),
                data: { requiredStatus: 'FLIGHT_SELECTED' },
            },
            {   path: 'passengers',
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/passengers-page/passengers-page.component'),
                data: { requiredStatus: 'FLIGHT_SELECTED' },
            },
            {
                path: 'seats',
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/seats-page/seats-page.component'),
                data: { requiredStatus: 'PASSENGER_SELECTED' },
            },
            {
                path: 'summary',
                canMatch: [bookingStatusGuard] ,
                loadComponent: ()=> import('@presentation/pages/booking-summary-page/booking-summary-page.component'),
                data: { requiredStatus: 'SEATS_SELECTED' }
            },
            {
                path: 'confirmation',
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/booking-confirmation-page/booking-confirmation-page.component'),
                data: { requiredStatus: 'BOOKED'  }
            }
        ]
    },
    { path: '**', redirectTo: ''}
];
