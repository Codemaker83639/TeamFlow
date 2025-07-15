// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa UsersModule

@Module({
  imports: [
    UsersModule, // Necesitamos el UsersService para encontrar usuarios
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key', // ¡Usa la misma clave que en docker-compose!
      signOptions: { expiresIn: '60m' }, // Token expira en 60 minutos
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Exporta AuthService si otros módulos lo necesitarán
})
export class AuthModule {}
