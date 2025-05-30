import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
  app.enableCors({
    origin: [
      
      'https://atoy-venue-front.netlify.app', // Allow your frontend domain
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ],

    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
  });


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
