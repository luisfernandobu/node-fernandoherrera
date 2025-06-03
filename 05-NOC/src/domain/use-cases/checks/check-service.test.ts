import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('check-service.ts', () => {

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();

    const checkService = new CheckService(
        mockLogRepository,
        mockSuccessCallback,
        mockErrorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch is ok', async() => {
        const result = await checkService.execute('https://google.com');

        expect(result).toBe(true);
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch fails', async() => {
        const result = await checkService.execute('http://localhost:3000');

        expect(result).toBe(false);
        expect(mockSuccessCallback).not.toHaveBeenCalled();
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});
