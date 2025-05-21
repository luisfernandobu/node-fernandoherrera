import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const emailService = new EmailService();

export class ServerApp {
    public static start(): void {
        console.log('Server started...');
        
        /** Cron job example **/
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';
        //         // const url = 'http://localhost:3000';
                
        //         // Dependency injection
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`Service is up: ${url}`),
        //             (error: string) => console.log(error),
        //         ).execute(url);
        //     }
        // );

        /** Email service example **/
        // emailService.sendEmail({
        //     to: 'luis081097@hotmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //     <h3>Logs de sistema - NOC</h3>
        //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tellus massa, sagittis nec arcu sed, malesuada blandit enim. Morbi suscipit augue vitae velit efficitur, eu dapibus mauris mollis. Vestibulum lacus justo, cursus a magna nec, ornare pretium dui. Donec rutrum ex at rhoncus placerat. Vestibulum tempus dapibus massa, ac iaculis tellus vestibulum eget. Nulla interdum odio elit, et pharetra turpis maximus et. Ut risus lacus, sollicitudin ut tortor vel, eleifend tincidunt augue. Fusce eget turpis pharetra, dictum est vitae, sollicitudin sapien. Nulla nec mauris ac nunc facilisis malesuada. Donec finibus sapien orci, sit amet scelerisque tortor ultricies a.</p>
        //     <p>Ver logs adjuntos.</p>
        //     `
        // });

        // emailService.sendEmailWithFileSystemLogs([
        //     'luis_fernando_1997@hotmail.com',
        //     'luis.borquezu@outlook.com',
        //     'eeocdl@hotmail.com'
        // ]);

        /** Send logs email use-case example **/
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute([
        //     'luis_fernando_1997@hotmail.com',
        //     'luis.borquezu@outlook.com',
        //     'eeocdl@hotmail.com'
        // ]);

    }
}
