import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip"
    }
}

const mockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit teste create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = mockRepository();
        const customerCreateUseCase = new CreateCustomerUsecase(customerRepository);
        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: input.address
        });
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = mockRepository();
        const customerCreateUseCase = new CreateCustomerUsecase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    })
});
