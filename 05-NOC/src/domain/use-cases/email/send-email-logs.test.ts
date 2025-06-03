import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";


describe('send-email-logs.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn()
    }
    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );
    const testEmail = 'luis@correo.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(true);
        const result = await sendEmailLogs.execute(testEmail);

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(testEmail);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts",
        });
    });

    test('should call saveLog with error message if sendEmailWithFileSystemLogs fails', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
        const result = await sendEmailLogs.execute(testEmail);

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(testEmail);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Error sending log email",
            origin: "send-email-logs.ts",
        });
    });
});
