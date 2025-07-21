import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterAuthDto) {
        return this.authService.register(registerDto);
    }
    // --- AÑADE ESTA NUEVA RUTA DE PRUEBA ---
    @Get('test')
    testRoute() {
        return 'La ruta de prueba de Auth funciona!';
    }
    // -----------------------------------------

}
