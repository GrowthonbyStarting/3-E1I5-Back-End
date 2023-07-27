import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { HttpExceptionFilter } from './libs/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
}
bootstrap();
