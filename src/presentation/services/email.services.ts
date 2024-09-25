import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments ?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
  contentType:string
}

export class EmailService {
  static async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments : attachments  = [] } = options;

    const transporter: Transporter = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
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
        attachments : attachments ,
      });

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
