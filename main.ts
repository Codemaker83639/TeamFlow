// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importar ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para que el frontend pueda comunicarse
  app.useGlobalPipes(new ValidationPipe()); // Habilita la validación de DTOs
  await app.listen(3000);
}
bootstrap();