import mongoose from "mongoose";

interface ConnectionOtions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: ConnectionOtions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            return true;            
        } catch (error) {
            throw error;
        }
    }
}
