import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeatsApiService } from './seats-api.service';
import SeatsDTO, { SeatDTO } from '@app/core/dtos/seat.dto';
import { environment } from '@environments/environment';

describe('SeatsApiService', () => {
  let service: SeatsApiService;

  const apiUrl = environment.apiUrl;
  const seatsPath = { getAll: '/seats' };

  let httpMock: HttpTestingController;

   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SeatsApiService
      ]
    });

    service = TestBed.inject(SeatsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /seats with the flightNumber and return SeatsDTO', (done) => {
    const mockFlight = 'AV123';
    const mockResponse: SeatsDTO = {
      data: {
        firstClass: [
          {
            flightNumber: mockFlight,
            seatNumber: '1A',
            seatClass: 'FIRST',
            price: 500,
            isAvailable: true
          } as SeatDTO
        ],
        plus: [
          {
            flightNumber: mockFlight,
            seatNumber: '4B',
            seatClass: 'PLUS',
            price: 300,
            isAvailable: false
          } as SeatDTO
        ],
        emergency: [],
        economy: [
          {
            flightNumber: mockFlight,
            seatNumber: '10C',
            seatClass: 'ECONOMY',
            price: 100,
            isAvailable: true
          } as SeatDTO
        ]
      },
      meta: {
        lastUpdated: new Date().toISOString(),
      }
    };

    service.getAllSeatsByFlight(mockFlight).subscribe((result) => {
      expect(result).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(`${apiUrl}${seatsPath.getAll}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ flightNumber: mockFlight });

   
    req.flush(mockResponse);
  });
});
