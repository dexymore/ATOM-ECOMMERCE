import { htmlToText } from 'html-to-text';
import { Transporter, SendMailOptions } from 'nodemailer';
import nodemailer from 'nodemailer';

import { User ,IUser} from '../models/userModel';

export default class Email {
    to: string;
    firstName: string;
    url: string;
    from: string;

    constructor(user: IUser, url: string) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `admin ahmed suleiman <${process.env.EMAIL_FROM}>`;
    }

    private newTransport(): Transporter {
        // Configure your email transport here
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }

    async sendWelcomeEmail(): Promise<void> {
        // Generate HTML for the welcome email
        const html = `
            <html>
                <body>
                    <h1>Welcome to ATOM, ${this.firstName}!</h1>
                    <p>We are thrilled to have you join us.</p>
                    <p>Visit our website: <a href="${this.url}">${this.url}</a></p>
                    <p>Best regards,<br>Admin</p>
                </body>
            </html>
        `;

        await this.sendEmail(html, 'Welcome to Our Website');
    }

    async sendPasswordResetEmail(): Promise<void> {
        // Generate HTML for the password reset email
        const html = `
            <html>
                <body>
                    <h1>Password Reset Request</h1>
                    <p>You are receiving this email because you requested a password reset.</p>
                    <p>Click this link to reset your password: <a href="${this.url}">${this.url}</a></p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Best regards,<br>Admin</p>
                </body>
            </html>
        `;

        await this.sendEmail(html, 'Password Reset Request');
    }

    private async sendEmail(html: string, subject: string): Promise<void> {
        // Convert HTML to plain text
        const text = htmlToText(html);

        // Define email options
        const mailOptions: SendMailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text,
        };

        // Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
}

