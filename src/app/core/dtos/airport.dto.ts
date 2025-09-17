interface AirportData {
    iata_code: string;
    airport_name: string;
    location_city: string;
    location_country: string;
}

export interface AirportDTO {
    data: AirportData[];
    meta: {
        count: number;
        lastUpdated: string;
    }
}