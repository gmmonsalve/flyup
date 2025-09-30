import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import BookingDTO from '@app/core/dtos/booking.dto';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingApiService {

  private _http: HttpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private _bookingPath = environment.path.booking;

  createBooking(booking: BookingDTO){
    return this._http.post(`${this._apiUrl}${this._bookingPath.create}`, booking);
  }
}
