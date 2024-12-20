import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configureGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}
