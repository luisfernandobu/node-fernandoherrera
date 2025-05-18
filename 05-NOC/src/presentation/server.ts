import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class ServerApp {
    public static start(): void {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                // const url = 'http://localhost:3000';
                
                // Dependency injection
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`Service is up: ${url}`),
                    (error: string) => console.log(error),
                ).execute(url);
            }
        );
    }
}
