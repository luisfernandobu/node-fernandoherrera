import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from "./email.service";

describe('email.service.ts', () => {

    const mockSendMail = jest.fn();
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();
    const destinationEmail = 'test@email.com';

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should send an email', async() => {
        const options: SendEmailOptions = {
            to: destinationEmail,
            subject: 'Test email',
            htmlBody: '<h1>Test</h1>',
        }

        const emailSent = await emailService.sendEmail(options);

        expect(emailSent).toBe(true);
        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: options.htmlBody,
            subject: options.subject,
            to: options.to,
        });
    });

    test('should send an email with file system logs', async() => {
        await emailService.sendEmailWithFileSystemLogs(destinationEmail);

        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            to: destinationEmail,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-low.log', path: './logs/logs-low.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
            ])
        }));
    });
});
