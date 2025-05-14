import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
    public static start(): void {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                
                // Dependency injection
                new CheckService(
                    () => console.log(`Service is up: ${url}`),
                    (error: string) => console.log(error),
                ).execute(url);

                // new CheckService().execute('http://localhost:3000');
            }
        );
    }
}
