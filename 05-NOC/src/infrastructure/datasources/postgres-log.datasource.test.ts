
import { PrismaClient } from "../../data/postgresql/generated/prisma";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource, severityEnum } from "./postgres-log.datasource";

describe('postgres-log.datasource.ts', () => {
    const prismaClient = new PrismaClient();
    const logDatasource = new PostgresLogDatasource();
    const newLog = new LogEntity({
        message: 'Test message',
        origin: 'postgres-log.datasource.test.ts',
        level: LogSeverityLevel.low,
    });

    beforeAll(async() => {
        await prismaClient.logModel.deleteMany();
    });

    afterEach(async() => {
        await prismaClient.logModel.deleteMany();
    });

    test('should create a log', async() => {
        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(newLog);

        expect(logSpy).toHaveBeenCalledWith(`Log saved:`, expect.any(Number));
    });

    test('should get logs with an specific severity level', async() => {
        await logDatasource.saveLog(newLog);

        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0].level).toBe(severityEnum[newLog.level]);
    });

    test('should get all logs', async() => {
        const highLevelLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.high,
            origin: 'postgres-log.datasource.test.ts',
        });
        
        await logDatasource.saveLog(newLog);
        await logDatasource.saveLog(highLevelLog);

        const logs = await logDatasource.getLogs();
        
        expect(logs).toHaveLength(2);
        expect(logs[0].level).toBe(severityEnum[newLog.level]);
        expect(logs[1].level).toBe(severityEnum[highLevelLog.level]);
    });
});
