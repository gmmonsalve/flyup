import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface PassengersForm{
    passengers: FormArray<FormGroup<SinglePassengerForm>>;
    bookingHolder: FormGroup<BookingHolder>;
}

export interface BookingHolder{
    passenger: FormControl<{
        firstName: string;
        lastName: string;
        birtDate: string;
        nationality: string;
        gender: string;
    } | null>;
    prefix: FormControl<string | null>;
    phone: FormControl<string | null>;
    email: FormControl<string | null>;
    confirmEmail: FormControl<string | null>;
}

export interface SinglePassengerForm{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    birthDate: FormControl<Date | null>;
    nationality: FormControl<{ code: string, title: string } | null>;
    gender: FormControl<"Male" | "Female" | "Other" | null>;
}

export interface PassengerFormValues{
    passengers: {
        firstName: string | null;
        lastName: string | null;
        birthDate: Date | null;
        nationality: { code: string, title: string } | null;
        gender: "Male" | "Female" | "Other" | null;
    }[];
    bookingHolder: {
         passenger: {
            firstName: string | null;
            lastName: string | null;
            birtDate: string | null;
            nationality: string | null;
            gender: string | null;
        } | null;
        prefix: string | null;
        phone: string | null;
        email: string | null;
        confirmEmail: string | null;
    }
}