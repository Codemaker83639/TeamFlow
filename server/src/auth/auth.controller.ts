import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // ---RUTA DE PRUEBA para el POST de registro ---
    @Post('register')
    register(@Body() registerDto: RegisterAuthDto) {
        return this.authService.register(registerDto);
    }
    // ---RUTA DE PRUEBA para el LOGIN ---
    @Post('login')
    login(@Body() loginDto: LoginAuthDto) {
        return this.authService.login(loginDto);
    }

    // ---RUTA DE PRUEBA para el GET ---
    @Get('test')
    testRoute() {
        return 'La ruta de prueba funciona!';
    }
    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile() {
        return "Este es un perfil protegido y solo puedes verlo si estás autenticado.";
    }

}


