import { environment } from '@environments/environment';
import { BookingRules } from './booking.business';
import BookingRulesConfig from './interfaces/bookingRulesConfig.interface';
import Passenger from '../models/passenger.model';
import User from '../models/user.model';
import Flight from '../models/flight.model';
import Booking from '../models/booking.model';

describe('BookingService', () => {
  let bookingRules: BookingRules;
  let rulesConfig: BookingRulesConfig;
  let passengers: Passenger[];
  let bookingHolder: User;
  let flights: Flight[];

  beforeEach(() => {
    rulesConfig = environment.config;
    bookingRules = new BookingRules(rulesConfig);

    passengers = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
        birthDate: new Date('1990-01-01'),
        nationality: 'US',
        gender: 'Female',
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        birthDate: new Date('1985-05-05'),
        nationality: 'US',
        gender: 'Male',
      },
    ];

    bookingHolder = {
      ...passengers[0],
      email: 'alice@example.com',
      prefix: '+1',
      phoneNumber: '5551234567',
    };

    flights = [
      {
        flightNumber: 'AA123',
        origin: { code: 'JFK', city: 'New York' },
        destination: { code: 'LAX', city: 'Los Angeles' },
        departureDate: { date: '2025-10-01', time: '08:00' },
        arrivalDate: { date: '2025-10-01', time: '11:00' },
        duration: '3h',
        price: 200,
      },
    ];
  });

  it('should be created', () => {
    expect(bookingRules).toBeTruthy();
  });

  describe('validateSeatSelection', () => {
    it('should not throw when seats match passengers × flights', () => {
      const booking: Booking = {
        bookingHolder,
        passengers,
        flights,
        selectedSeats: [
          {
            flightNumber: 'AA123',
            seatNumber: '12A',
            seatClass: 'ECONOMY',
            price: 100,
            isAvailable: true,
          },
          {
            flightNumber: 'AA123',
            seatNumber: '12B',
            seatClass: 'ECONOMY',
            price: 120,
            isAvailable: true,
          },
        ],
        totalPrice: 0,
        status: 'SEATS_SELECTED',
        tripType: 'one-way',
      };

      expect(() => bookingRules.validateSeatSelection(booking)).not.toThrow();
    });
  });

});
