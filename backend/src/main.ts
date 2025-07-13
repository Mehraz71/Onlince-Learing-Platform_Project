import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

 app.use(
    session({
      secret: 'secret-key', 
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,         
        maxAge: 1000 * 60 * 60 * 24, 
        sameSite: 'lax',        
        secure: false,          
      },
    }),
  );










  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}

bootstrap();
