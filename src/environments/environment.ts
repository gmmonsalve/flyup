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
    }
  }
};