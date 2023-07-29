export interface InputFindCustomerDto {
    id: string
}

export interface OutputFindCustomerDto {
    id: string;
    name: string;
    adrress: {
        street: string;
        city: string;
        number: string;
        zip: string;
    }
}
