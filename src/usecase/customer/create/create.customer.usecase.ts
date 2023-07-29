import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputCreateCustomerDto, OutputCreateCustomerDto} from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        );

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip,
            }
        }
    }
}
