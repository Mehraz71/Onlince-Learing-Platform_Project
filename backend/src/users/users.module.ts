import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { SessionJwtGuard } from 'src/auth/session-token.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({
        secret: 'JWT_SECRET',
        signOptions: { expiresIn: '1h' },
      }),],
  providers: [UsersService,SessionJwtGuard,JwtService,JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
