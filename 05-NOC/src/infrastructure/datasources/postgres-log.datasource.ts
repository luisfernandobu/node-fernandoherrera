import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../data/postgresql/generated/prisma";

const prismaClient = new PrismaClient();

export const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level]
            }
        });

        console.log('Log saved:', newLog.id);
    }

    async getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = (severityLevel)
            ? await prismaClient.logModel.findMany({
                where: {
                    level: severityEnum[severityLevel]
                }
            })
            : await prismaClient.logModel.findMany();

        return logs.map((log) => LogEntity.fromObject(log));
    }
}

