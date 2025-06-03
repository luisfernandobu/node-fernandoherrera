import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { envs } from "../../../config/plugins/envs.plugin";
import { LogModel } from "./log.model";


describe('log.model.ts', () => {
    beforeAll(async() => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should return LogModel', async() => {
        const logData = {
            message: 'Test log message',
            level: 'medium',
            origin: 'log.model.test.ts'
        }

        const newLog = await LogModel.create(logData);

        expect(newLog).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));

        await LogModel.findByIdAndDelete(newLog.id);
    });

    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;
        
        expect(schema).toEqual(expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                level: {
                    type: expect.any(Function),
                    enum: [ 'low', 'medium', 'high' ],
                    default: 'low'
                },
                origin: { type: expect.any(Function), required: true },
                createdAt: expect.any(Object)
            }
        ));
    });
});
