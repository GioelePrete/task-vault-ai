import {useGlobalStore} from "@/store/GlobalStore";

describe("GlobalStore Validation", () => {

    jest.mock('zustand');
    const {loginValidation, registerValidation} = useGlobalStore.getState();

    it("should return undefined for valid login values", () => {
        const validValues = {
            email: "test@example.com",
            password: "validpassword",
            fullname: "John Doe",
        };

        const errors = loginValidation(validValues);

        expect(errors).toBeUndefined();
    });

    it("should return errors for invalid login values", () => {
        const invalidValues = {
            email: "invalid-email",
            password: "short",
            fullname: "",
        };

        const errors = loginValidation(invalidValues);

        expect(errors).toEqual(expect.objectContaining({
            email: "Invalid email address",
            password: "Must be greater then 8 characters long",
        }));
    });

    it("should return undefined for valid register values", () => {
        const validValues = {
            email: "test@example.com",
            password: "validpassword",
            fullname: "John Doe",
        };

        const errors = registerValidation(validValues);

        expect(errors).toBeUndefined();
    });

    it("should return errors for invalid register values", () => {
        const invalidValues = {
            email: "invalid-email",
            password: "short",
            fullname: "invalidfullname",
        };

        const errors = registerValidation(invalidValues);

        expect(errors).toEqual(expect.objectContaining({
            email: "Invalid email address",
            password: "Must be greater then 8 characters long",
            fullname: "Invalid fullname",
        }));
    });
});

