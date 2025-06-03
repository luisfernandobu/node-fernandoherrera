import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongodb";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('mongo-log.datasource.ts', () => {

    const logDatasource = new MongoLogDatasource();
    const newLog = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.low,
        origin: 'mongo-log.datasource.test.ts'
    });

    beforeAll(async() => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(async() => {
        mongoose.connection.close();
    });

    test('should create a log', async() => {
        
        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(newLog);

        expect(logSpy).toHaveBeenCalledWith(`Log created:`, expect.any(String));
    });

    test('should get logs with an specific severity level', async() => {
        await logDatasource.saveLog(newLog);

        const logs = await logDatasource.getLogs(LogSeverityLevel.low);

        expect(logs).toHaveLength(1);
        expect(logs[0].level).toBe(newLog.level);
    });

    test('should get all logs', async() => {
        const highLevelLog = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.high,
            origin: 'mongo-log.datasource.test.ts',
        });
        
        await logDatasource.saveLog(newLog);
        await logDatasource.saveLog(highLevelLog);

        const logs = await logDatasource.getLogs();
        
        expect(logs).toHaveLength(2);
        expect(logs[0].level).toBe(newLog.level);
        expect(logs[1].level).toBe(highLevelLog.level);
    });
});
