import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PassengersFacadeService } from '@abstraction/facades/passengers/passengers-facade.service';
import { PassengerFormComponent } from '@presentation/components/passenger-form/passenger-form.component';
import { PassengerFormValues } from '@presentation/models/passenger-form.vmodel';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParams } from '@app/presentation/models/search-params.vmodel';
import { CountriesFacadeService } from '@app/abstraction/facades/countries/countries-facade.service';
import { Observable, Subscription } from 'rxjs';
import Country from '@app/core/models/country.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-passengers-page',
  standalone: true,
  imports: [PassengerFormComponent, AsyncPipe],
  providers: [],
  templateUrl: './passengers-page.component.html',
  styleUrl: './passengers-page.component.scss'
})
export default class PassengersPageComponent implements OnInit, OnDestroy{

  private _passengersFacade = inject(PassengersFacadeService);
  private _countriesFacade = inject(CountriesFacadeService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  searchParams: SearchParams | undefined;
  countries$: Observable<Country[]> | undefined;
  route$: Subscription | undefined;


  ngOnInit(): void {
    this.route$ = this._route.queryParams.subscribe((queryParams)=>{
        this.searchParams = queryParams as SearchParams;
    })
    this.countries$ = this._countriesFacade.getCountries();
  }

  onFormFilled(formValue: PassengerFormValues): void{
    this._passengersFacade.addPassengers(formValue);
    this._router.navigate(['/booking/seats'], { queryParams: this.searchParams });
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }

}
