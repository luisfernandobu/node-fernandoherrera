import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init.ts', () => {
    afterAll(() => {
        mongoose.connection.close();
    });
    
    test('should connect to MongoDB', async() => {
        const result = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(result).toBe(true);
    });

    test('should throw an error if connection fails', async() => {
        await expect(MongoDatabase.connect({
            dbName: 'invalid_db_name',
            mongoUrl: 'invalid_mongo_url'
        })).rejects.toThrow();
    });
});
