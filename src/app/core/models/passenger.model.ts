export default interface Passenger{
    firstName: string;
    lastName: string;
    birthDate: Date;
    nationality: { code: string, title: string };
    gender: "Male" | "Female" | "Other";
}