import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- LA ÚNICA LÍNEA QUE IMPORTA ---
  // Orden directa: "Cualquier petición que empiece con /uploads, sírvela desde la carpeta 'uploads' que está en la raíz".
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  // ------------------------------------

  app.enableCors({
    origin: ['http://localhost:8080'], // Tu configuración original y correcta
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();