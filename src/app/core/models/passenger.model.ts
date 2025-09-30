export default interface Passenger{
    firstName: string;
    lastName: string;
    birthDate: Date;
    nationality: string;
    gender: "Male" | "Female" | "Other";
}