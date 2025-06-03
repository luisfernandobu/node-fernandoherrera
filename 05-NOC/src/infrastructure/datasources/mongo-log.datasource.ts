import { LogModel } from "../../data/mongodb";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Log created:', newLog.id);
    }

    async getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = (severityLevel) 
            ? await LogModel.find({level: severityLevel}) 
            : await LogModel.find();

        return logs.map((log) => LogEntity.fromObject(log));
    }
}
