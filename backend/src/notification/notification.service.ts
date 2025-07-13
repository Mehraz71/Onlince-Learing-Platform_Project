
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mehrazofficial52@gmail.com',
      pass: 'ojje uxlj lskt zhdf',
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Coursera" <coursera@edu.com>',
      to,
      subject,
      text,
    });
  }
}
