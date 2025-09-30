export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/fly-app/api',
  path: {
    flights: {
      search: '/flights/search'
    },
    airports:{
      getAll: '/airports'
    },
    countries: {
      getAll: '/countries'
    },
    seats: {
      getAll: '/seats'
    },
    booking: {
      create: '/booking/create'
    }
  },
  config: {
    MAX_PASSENGERS: 9,
    MIN_PASSENGERS: 1,
    ONE_WAY_FLIGHT_NUMBER: 1,
    ROUND_TRIP_FLIGHT_NUMBER: 2,
    TRIP_TYPE: {
      oneWay: "one-way",
      roundTrip: "round-trip"
    }
  }
};