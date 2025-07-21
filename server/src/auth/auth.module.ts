import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config'; // <-- Asegúrate de que esta línea esté
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy'; // <-- Importa la nueva estrategia

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_super_secret_jwt_key_here_change_in_production',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, ConfigService], // <-- MODIFICACIÓN: Añade JwtStrategy y ConfigService
})
export class AuthModule { }