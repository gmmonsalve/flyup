export default interface Passenger{
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    typeOfIdentification: 'DNI' | 'PASSPORT' | 'OTHER';
    identificationNumber: string;
    gender: "Male" | "Female" | "Other";
}