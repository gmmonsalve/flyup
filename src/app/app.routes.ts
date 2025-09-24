import { Routes } from '@angular/router';
import { bookingGuard } from './presentation/guards/booking.guard';

export const routes: Routes = [
    { path: '', loadComponent: ()=> import('@presentation/pages/search-page/search-page.component') },
    { path: 'flights/search', loadComponent: ()=> import('@presentation/pages/flights-page/flights-page.component')},
    { path: 'booking', canMatch: [bookingGuard],
        children: [
            { path: 'resume', loadComponent: ()=> import('@app/presentation/pages/booking-resume-page/booking-resume-page.component')},
        ]
    },
    { path: '**', redirectTo: ''}
];
