import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita la validación automática de DTOs en toda la aplicación
  app.useGlobalPipes(new ValidationPipe());

  // --- AÑADE ESTA CONFIGURACIÓN DE CORS ---
  app.enableCors({
    origin: ['http://localhost:8080'], // Tu frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // ----------------------------------------

  await app.listen(3000);
}
bootstrap();
