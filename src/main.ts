import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);
}
bootstrap();
