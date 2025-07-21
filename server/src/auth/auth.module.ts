import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_super_secret_jwt_key_here_change_in_production', // ¡IMPORTANTE! Usa la misma clave que en tu docker-compose.yml
            signOptions: {
                expiresIn: '24h', // Token expira en 24 horas
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }