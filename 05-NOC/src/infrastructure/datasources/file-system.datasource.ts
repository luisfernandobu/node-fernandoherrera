import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath        = 'logs/';
    private readonly allLogsPath    = 'logs/logs-all.log';
    private readonly lowLogsPath    = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath   = 'logs/logs-high.log';

    constructor() {
        this.cretateLogsfiles();
    }

    private cretateLogsfiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        const pathBySeverityLevel = {
            [LogSeverityLevel.low]: this.lowLogsPath,
            [LogSeverityLevel.medium]: this.mediumLogsPath,
            [LogSeverityLevel.high]: this.highLogsPath
        }

        fs.appendFileSync(this.allLogsPath, logAsJson);
        fs.appendFileSync(pathBySeverityLevel[newLog.level], logAsJson);
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map((log) => LogEntity.fromJson(log));

        return logs;
    }

    async getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.lowLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            case undefined:
                return this.getLogsFromFile(this.allLogsPath);
            
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }
}
