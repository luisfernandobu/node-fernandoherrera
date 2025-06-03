import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.ts', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('saveLog should call the datasource with args', async() => {
        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'log.repository.impl.test.ts' 
        });

        await logRepositoryImpl.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the datasource with args', async() => {
        const severityLevel = LogSeverityLevel.medium;

        await logRepositoryImpl.getLogs(severityLevel);

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
    });
});
