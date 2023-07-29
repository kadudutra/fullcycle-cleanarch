export interface InputFindCustomerDto {
    id: string
}

export interface OutputFindCustomerDto {
    d: string;
    name: string;
    adrress: {
        street: string;
        city: string;
        number: string;
        zip: string;
    }
}
