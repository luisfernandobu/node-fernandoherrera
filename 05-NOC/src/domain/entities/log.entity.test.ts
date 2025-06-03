import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {
    test('should create a LogEntity instance', () => {
        const logData = {
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'log.entity.test.ts'
        };
        const log = new LogEntity(logData);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {
        const logData = {
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'log.entity.test.ts',
            createdAt: new Date()
        };
        const jsonData = JSON.stringify(logData);
        const log = LogEntity.fromJson(jsonData);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
        expect(log.createdAt).toEqual(logData.createdAt);
    });

    test('should create a LogEntity instance from an object', () => {
        const logData = {
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'log.entity.test.ts',
            createdAt: new Date()
        };

        const log = LogEntity.fromObject(logData);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logData.message);
        expect(log.level).toBe(logData.level);
        expect(log.origin).toBe(logData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
        expect(log.createdAt).toEqual(logData.createdAt);
    });
});
