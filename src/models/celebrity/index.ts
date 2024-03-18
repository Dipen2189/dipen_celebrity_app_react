export interface ICelebrityList {
    id: number;
    first: string;
    last: string;
    dob: string | Date;
    gender: string | string[];
    email: string;
    picture: string;
    country: string;
    description: string;
    name?: string;
}
