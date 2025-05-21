import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    constructor() {}

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            console.log(sentInformation);

            return true;
        } catch (error) {
            console.log(`Error sending email: ${error}`);
            
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tellus massa, sagittis nec arcu sed, malesuada blandit enim. Morbi suscipit augue vitae velit efficitur, eu dapibus mauris mollis. Vestibulum lacus justo, cursus a magna nec, ornare pretium dui. Donec rutrum ex at rhoncus placerat. Vestibulum tempus dapibus massa, ac iaculis tellus vestibulum eget. Nulla interdum odio elit, et pharetra turpis maximus et. Ut risus lacus, sollicitudin ut tortor vel, eleifend tincidunt augue. Fusce eget turpis pharetra, dictum est vitae, sollicitudin sapien. Nulla nec mauris ac nunc facilisis malesuada. Donec finibus sapien orci, sit amet scelerisque tortor ultricies a.</p>
        <p>Ver logs adjuntos.</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-low.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}
