import { Routes } from '@angular/router';
import { bookingGuard } from './presentation/guards/booking.guard';
import { bookingStatusGuard } from './presentation/guards/booking-status.guard';

export const routes: Routes = [
    { path: '', loadComponent: ()=> import('@presentation/pages/search-page/search-page.component') },
    {
        path: 'flights/search',
        loadComponent: ()=> import('@presentation/pages/flights-page/flights-page.component'),
        data: { requiredStatus: 'FLIGHT_SELECTION' },
    },//bug, falta guard. caundo se redirige aqui debe creaase un nuevo booking.
    { path: 'booking', canMatch: [bookingGuard],
        children: [
            {   path: 'resume', 
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/booking-resume-page/booking-resume-page.component'),
                data: { requiredStatus: 'FLIGHT_SELECTED' },
            },
            {   path: 'passengers',
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/passengers-page/passengers-page.component'),
                data: { requiredStatus: 'FLIGHT_SELECTED' },//aqui se podria tener otro estado. SELECTION_CONFIRMED
            },
            {
                path: 'seats',
                canMatch: [bookingStatusGuard],
                loadComponent: ()=> import('@presentation/pages/seats-page/seats-page.component'),
                data: { requiredStatus: 'PASSENGER_SELECTED' },
            }
        ]
    },
    { path: '**', redirectTo: ''}
];
