import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: ['http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // --- REVERTIMOS A LA TUBERÍA GLOBAL ORIGINAL Y SIMPLE ---
  // Esto solucionará los errores 400 al crear proyectos y tareas.
  app.useGlobalPipes(new ValidationPipe());
  // --------------------------------------------------------

  await app.listen(3000);
}
bootstrap();

