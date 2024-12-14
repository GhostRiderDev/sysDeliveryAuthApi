import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'reflect-metadata';
import { SERVER_PORT } from './user/infraestructure/config/Env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  await app.listen(SERVER_PORT ?? 5050);
}
bootstrap();
