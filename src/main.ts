import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PORT } from './config';
import { HttpExceptionFilter } from './libs/exception';
import { setupSwagger } from './libs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ credentials: true, origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  await app.listen(Number(PORT));
}
bootstrap();
