import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mehrazofficial52@gmail.com',
      pass: 'ojje uxlj lskt zhdf',
    },
  });

  async sendVerificationEmail(to: string, token: string) {
    const url = `http://localhost:3000/auth/verify?token=${token}`;
    const mailOptions = {
      from: '"C O U R S E R A" <nuka4424@gmail.com>',
      to,
      subject: 'Email Verification - Active Learners',
      html: `
        <h3>Welcome to C O U R S E R A!</h3>
        <p>Please click the link below to verify your email:</p>
        <a href="${url}">${url}</a>
        <p>This link will expire soon. If you did not sign up, please ignore this email.</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
/////

 async sendResetPasswordEmail(email: string, resetLink: string) {
    const mailOptions = {
      from:  '"C O U R S E R A" <nuka4424@gmail.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>Password Reset Request</h2>
          <p>You recently requested to reset your password.</p>
          <p>Click the button below to set a new password:</p>
          <a 
            href="${resetLink}" 
            style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p style="margin-top: 20px;">If you didn’t request this, just ignore this email.</p>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}









