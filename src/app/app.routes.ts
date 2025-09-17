import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: ()=> import('@presentation/pages/search-page/search-page.component') },
];
