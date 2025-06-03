import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts', () => {
    const logsPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logsPath, { force: true, recursive: true });
    });

    afterAll(() => {
        fs.rmSync(logsPath, { force: true, recursive: true });
    });

    test('should creat log paths if do not exists', () => {
        new FileSystemDatasource();
        const logFiles = fs.readdirSync(logsPath);
        
        expect(logFiles).toEqual(['logs-all.log','logs-high.log','logs-low.log','logs-medium.log']);
    });

    test('should save a log in logs-all.log', async() => {
        const fsDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });
        
        await fsDatasource.saveLog(newLog);
        const allLogs = await fsDatasource.getLogs();

        expect(allLogs).toHaveLength(1);
    });

    test('should save a log in logs-all.log and logs-high.log', async() => {
        const fsDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        await fsDatasource.saveLog(newLog);
        const allLogs = await fsDatasource.getLogs();
        const highLogs = await fsDatasource.getLogs(LogSeverityLevel.high);

        expect(allLogs).toHaveLength(1);
        expect(highLogs).toHaveLength(1);
    });

    test('should save a log in logs-all.log and logs-medium.log', async() => {
        const fsDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        await fsDatasource.saveLog(newLog);
        const allLogs = await fsDatasource.getLogs();
        const mediumLogs = await fsDatasource.getLogs(LogSeverityLevel.medium);

        expect(allLogs).toHaveLength(1);
        expect(mediumLogs).toHaveLength(1);
    });

    test('should save a log in logs-all.log and logs-low.log', async() => {
        const fsDatasource = new FileSystemDatasource();
        const newLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        await fsDatasource.saveLog(newLog);
        const allLogs = await fsDatasource.getLogs();
        const lowLogs = await fsDatasource.getLogs(LogSeverityLevel.low);

        expect(allLogs).toHaveLength(1);
        expect(lowLogs).toHaveLength(1);
    });

    test('should throw an error if log level is invalid', async() => {
        const fsDatasource = new FileSystemDatasource();
        const invalidLogLevel = 'invalid-level' as LogSeverityLevel;

        try {
            await fsDatasource.getLogs(invalidLogLevel);
            expect(true).toBe(false); // should not be reached
        } catch (error) {
            expect(`${error}`).toContain(`Error: ${invalidLogLevel} not implemented`);
        }
    });
});
