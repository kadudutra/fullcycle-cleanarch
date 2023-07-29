import UpdateCustomerUsecase from "./update.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("street", 123, "zip", "city")
);

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "street Updated",
        city: "city Updated",
        number: 123,
        zip: "zip Updated",
    }
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)),
    }
}

describe("Unit test customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = mockRepository();
        const customerUpdateUseCase = new UpdateCustomerUsecase(customerRepository);
        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
