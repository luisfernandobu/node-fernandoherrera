import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongodb";
import { PrismaClient } from "./data/postgresql/generated/prisma";
import { ServerApp } from "./presentation/server";

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });    

    ServerApp.start();
}
