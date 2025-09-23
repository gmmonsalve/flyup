import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { SearchCriteria } from '@core/models/search-criteria.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import Airport from '@core/models/airport.model';
import InputAirportFormatPipe from '@shared/pipes/input-airport-format.pipe';

@Component({
  selector: 'search-form',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIcon,  FormsModule,
    MatFormFieldModule, MatAutocompleteModule, MatButtonModule, MatSelectModule, MatRadioModule, 
    MatCardModule, ReactiveFormsModule, CommonModule, InputAirportFormatPipe],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit, OnDestroy{

  @Input() airports: Airport[] | null = [];
  @Input() passengers: number[] = [];
  @Output() search = new EventEmitter<SearchCriteria>();

  searchCriteriaForm: FormGroup = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    returnDate: new FormControl('', Validators.required),
    passengers: new FormControl('', Validators.required),
    tripType: new FormControl('round-trip'),
  });

  showReturnDate: boolean = true;
  tripTypeEvent$: Subscription | undefined;
  minDate: Date = new Date()

  private airportFormatPipe = inject(InputAirportFormatPipe)

  ngOnInit(): void {
    this.tripTypeEvent$ = this.searchCriteriaForm.controls['tripType'].valueChanges.subscribe(this.handleTripTypeControl.bind(this))
  }

  handleTripTypeControl(value: "round-trip" | "one-way"): void{
    if(value == 'round-trip'){
        this.addTripTypeControl()
      }else{
        this.removeTripTypeControl()
    }
  }

  removeTripTypeControl(): void{
    this.searchCriteriaForm.removeControl('returnDate');
    this.showReturnDate = false;
  }

  addTripTypeControl(): void{
    this.searchCriteriaForm.addControl('returnDate', new FormControl('', Validators.required));
    this.showReturnDate = true;
  }

  searchFlights(): void{
    if(!this.searchCriteriaForm.valid) return;
    const values = this.searchCriteriaForm.getRawValue()
    this.search.emit(values)
  }

  formatAirportValue(airport: Airport){
    return this.airportFormatPipe.transform(airport);
  }

  ngOnDestroy(): void{
    this.tripTypeEvent$?.unsubscribe();
  }

}
