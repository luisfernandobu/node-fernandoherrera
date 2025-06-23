import { CustomError } from "../../../src/domain/errors/custom.error";

describe('domain/errors/custom.error.ts', () => {
    const errorMessage = 'Test error message';
    const errorCode = 401;

    test('should create an instance of CustomError', () => {
        const customError = new CustomError(errorMessage, errorCode);

        expect(customError).toBeInstanceOf(CustomError);
        expect(customError).toBeInstanceOf(Error);
        expect(customError.message).toBe(errorMessage);
        expect(customError.statusCode).toBe(errorCode);
    });

    test('should create an instance of CustomError with default statusCode 400', () => {
        const customError = new CustomError(errorMessage);

        expect(customError).toBeInstanceOf(CustomError);
        expect(customError).toBeInstanceOf(Error);
        expect(customError.message).toBe(errorMessage);
        expect(customError.statusCode).toBe(400);
    });
});
