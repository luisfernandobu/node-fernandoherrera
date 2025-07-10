import nodemailer, { Transporter } from 'nodemailer';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private readonly transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
        private readonly postToProvider: boolean,
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        }); 
    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            if (!this.postToProvider) return true;

            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            return true;
        } catch (error) {
            console.log(`Error sending email: ${error}`);
            
            return false;
        }
    }
}
