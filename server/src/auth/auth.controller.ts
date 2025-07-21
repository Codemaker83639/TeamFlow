import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';

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
    // -----------------------------------------

}


