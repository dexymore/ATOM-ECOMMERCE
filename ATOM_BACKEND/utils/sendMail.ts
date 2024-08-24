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
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333333;">Password Reset Request</h1>
                    <p style="color: #666666;">You are receiving this email because you requested a password reset.</p>
                    <p>
                        <a href="${this.url}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #000000; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Reset Your Password
                        </a>
                    </p>
                    <p style="color: #666666;">If you did not request this, please ignore this email.</p>
                    <p style="color: #666666;">Best regards,<br>Admin</p>
                </div>
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

