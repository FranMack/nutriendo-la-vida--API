import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
  contentType: string;
}

export class EmailService {
  static async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments: attachments = [] } = options;

    const transporter: Transporter = nodemailer.createTransport({
      // GoDaddy's SMTP server
      host: "smtpout.secureserver.net", // GoDaddy's SMTP server
      port: 465, // Use port 465 for SSL (or 587 for TLS if you change to TLS)
      secure: true, // Use SSL for port 465 (set this to false for TLS with port 587)

      // Gmail's SMTP server
      //service: envs.MAILER_SERVICE,

      // Common configuration for both GoDaddy and Gmail
      auth: {
        user: envs.MAILER_EMAIL,
        pass: envs.MAILER_SECRET_KEY,
      },
    });

    try {
      const sentInformation = await transporter.sendMail({
        from: `Nutriendo la vida <${envs.MAILER_EMAIL}>`,
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
