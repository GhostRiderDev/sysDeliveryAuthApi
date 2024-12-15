import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'reflect-metadata';
import { SERVER_PORT } from './user/infraestructure/config/Env';
import { configureCors } from './user/infraestructure/config/Cors';
import { configureSwagger } from './user/infraestructure/config/Swagger';
import { configureGlobalPipes } from './user/infraestructure/config/Pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureCors(app);
  configureSwagger(app);
  configureGlobalPipes(app);

  await app.listen(SERVER_PORT ?? 5050);
}
bootstrap();
