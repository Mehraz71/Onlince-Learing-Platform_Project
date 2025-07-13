/*import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(
    username: string,
    email: string,
    password: string,
    phone: number,
  ) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');

    const hash = await bcrypt.hash(password, 10);
    return this.usersService.create({ username, email, password: hash, phone });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    return { message: 'Login successful', user };
  }
}*/

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mail-service/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    phone: string,
  ) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hash,
      phone,
      isVerified: false,
    });

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );

    await this.mailerService.sendVerificationEmail(user.email, token);

    return { message: 'Check your email to verify your account' };
  }

  /*async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }*/

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    if (!user.isVerified) throw new UnauthorizedException('Email not verified');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      phone:user.phone,
      password: user.password,
      isVerified:user.isVerified,

    };

    const token = this.jwtService.sign(payload);
    console.log('User role:', user.role);

    return {
      message: 'Login successful',
      access_token: token,
      role: user.role,
      user:{
        id:user.id,
        email:user.email,
        name:user.username,
        phone:user.phone,
      }
    };
  }

  async verifyUserEmail(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (user.isVerified) {
      return { message: 'Email already verified' };
    }

    user.isVerified = true;
    await this.usersService.save(user);
    return { message: 'Email verified successfully' };
  }

  //Forgot Password

async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await this.mailerService.sendResetPasswordEmail(user.email, resetLink);

    return { message: 'Password reset link sent to your email' };
  }


   async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verify(token);
      const user = await this.usersService.findOneById(payload.sub);

      if (!user) throw new NotFoundException('User not found');

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;

      await this.usersService.update(user.id, user);

      return { message: 'Password reset successful' };
    } catch (err) {
      throw new BadRequestException('Token is invalid or expired');
    }
  }













  
}
