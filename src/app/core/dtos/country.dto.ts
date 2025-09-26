export interface CountriesDTO{
    countries: CountryDTO[]
}

export interface CountryDTO{
    code: string, 
    name: string, 
    prefix: string 
}