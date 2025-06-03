import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('check-service.ts', () => {

    const mockLogRepository1 = {
            saveLog: jest.fn(),
            getLogs: jest.fn()
    };
    const mockLogRepository2 = {
            saveLog: jest.fn(),
            getLogs: jest.fn()
    };
    
    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockLogRepository1, mockLogRepository2],
        mockSuccessCallback,
        mockErrorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch is ok', async() => {
        const result = await checkService.execute('https://google.com');

        expect(result).toBe(true);
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();

        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch fails', async() => {
        const result = await checkService.execute('http://localhost:3000');

        expect(result).toBe(false);
        expect(mockSuccessCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        
        expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));   
    });
});
