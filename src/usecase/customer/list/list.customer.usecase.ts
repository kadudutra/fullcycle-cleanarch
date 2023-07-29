import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    city: customer.Address.city,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                }
            }))
        };
    }
}