import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookingHolder, PassengerFormValues, PassengersForm, SinglePassengerForm } from '@app/presentation/models/passenger-form.vmodel';
import { MatButtonModule } from '@angular/material/button';
import Passenger from '@app/core/models/passenger.model';
import Country from '@app/core/models/country.model';

@Component({
  selector: 'passenger-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './passenger-form.component.html',
  styleUrl: './passenger-form.component.scss'
})
export class PassengerFormComponent implements OnInit{

  @Input() numberPassengers: number | undefined = 0;
  @Input() countries: Country[] | null = null;
  @Output() filled: EventEmitter<PassengerFormValues> = new EventEmitter<PassengerFormValues>();

  passengersForm: FormGroup<PassengersForm> = new FormGroup({
    passengers: new FormArray<FormGroup<SinglePassengerForm>>([]),
    bookingHolder: new FormGroup<BookingHolder>({
      passenger: new FormControl(null, Validators.required),
      prefix: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      confirmEmail: new FormControl(null, [Validators.required, Validators.email])
    }, /* { validators: valuesMatchValidator('email', 'confirmEmail') } */)
  })
  bookingHolderOptionList: Passenger[] = []

  ngOnInit(): void {
    this.renderPassengersCards();
  }

  addPassenger(){
    const newPassenger: FormGroup<SinglePassengerForm> = new FormGroup<SinglePassengerForm>({
        firstName: new FormControl<string>('', Validators.required),
        lastName: new FormControl<string>('', Validators.required),
        birthDate: new FormControl<Date | null>(null, Validators.required),
        nationality: new FormControl<string | null>(null, Validators.required),
        gender: new FormControl<"Male" | "Female" | "Other" | null>(null, Validators.required),
    })
    this.passengersForm.controls.passengers.push(newPassenger)
  }

  onSubmit(){
    if(!this.passengersForm.valid) return;
    this.filled.emit(this.passengersForm.getRawValue())
  }

  get passengers(): FormArray {
    return this.passengersForm.controls.passengers as FormArray<FormGroup>;
  }

  setPassengersNames(): void{
    const passengers = [...this.passengers.getRawValue()]
    if(passengers.length == 0) return;
    this.bookingHolderOptionList = passengers;
  }

  renderPassengersCards(): void{
    if(!this.numberPassengers) return;
    const numberOfPassengers = this.numberPassengers;
    for(let i = 0; i < numberOfPassengers; i++){
       this.addPassenger();
    }
  }

}
