import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

console.log(process.env)


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(3000);
}

bootstrap().then().catch();
