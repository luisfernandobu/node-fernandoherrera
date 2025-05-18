import { json } from "stream/consumers";

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel, createdAt?: Date) {
        this.message = message;
        this.level = level;
        this.createdAt = createdAt || new Date();
    }

    static fromJson = (jsonData: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(jsonData);
        const log = new LogEntity(message, level, new Date(createdAt));

        return log;
    }
}
