import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  UseGuards,
  Req,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionJwtGuard } from './session-token.middleware';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(
      dto.username,
      dto.email,
      dto.password,
      dto.phone,
    );
  }

 /* @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }*/

    @Post('login')
async login(@Body('email') email: string, @Body('password') password: string, @Req() req) {
  const result = await this.authService.login(email, password); // returns jwt & user

  req.session.jwt = result.access_token;
  req.session.user = result.user;
  

  return {
    message: 'Login successful',
    user: result.user,
  };
}

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return this.authService.verifyUserEmail(payload.sub);
    } catch (err) {
      throw new BadRequestException('Invalid or expired verification token');
    }
  }

@UseGuards(SessionJwtGuard)
@Get('profile')
getProfile(@Req() req) {
  return {
  sub:req.user.sub,
  email:req.user.email,
  role:req.user.role,
  username:req.user.username,
  phone:req.user.phone,
  password:req.user.password,
  isVerified:req.user.isVerified,
  
  
};
 
}

@Post('logout')
logout(@Req() req, @Res() res) {
  req.session.destroy((err) => {
    if (err) {
      throw new InternalServerErrorException('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.send({ message: 'Logged out' });
  });
}

 @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }

  @UseGuards(SessionJwtGuard)
  @Get('check-session')
  checkSession(@Req() req) {
  
    return { valid: true, user: req.user };
  }
  

  
}

