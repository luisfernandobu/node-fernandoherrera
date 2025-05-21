
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public origin: string;
    public createdAt: Date;

    constructor(options: LogEntityOptions) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin
        this.createdAt = createdAt;
    }

    static fromJson = (jsonData: string): LogEntity => {
        const { message, level, origin, createdAt } = JSON.parse(jsonData);
        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        });

        return log;
    }
}
