import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Importa ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- AÑADE ESTA LÍNEA ---
  // Habilita la validación automática de DTOs en toda la aplicación
  app.useGlobalPipes(new ValidationPipe());
  // -------------------------

  await app.listen(3000);
}
bootstrap();
