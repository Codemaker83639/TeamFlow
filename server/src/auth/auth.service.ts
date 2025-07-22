import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterAuthDto) {
        const { email, username, password, fullName } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
        if (existingUser) {
            throw new ConflictException('Email or username already exists');
        }
        const user = this.userRepository.create({
            email,
            username,
            password_hash: password,
            full_name: fullName,
        });
        await this.userRepository.save(user);
        const { password_hash, ...result } = user;
        return result;
    }

    async login(loginDto: LoginAuthDto) {
        const { email, password } = loginDto;

        // 1. Buscar usuario por email
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'role', 'password_hash', 'full_name']
        });

        // --- LÍNEAS DE DEPURACIÓN ---
        console.log('--- INICIO DEPURACIÓN LOGIN ---');
        if (user) {
            console.log('Usuario encontrado:', user); // Imprime el objeto de usuario completo
            console.log('Contraseña recibida (plain):', password);
            console.log('Hash guardado en la BD:', user.password_hash);
        } else {
            console.log('Usuario NO encontrado con email:', email);
        }
        console.log('--- FIN DEPURACIÓN LOGIN ---');
        // -----------------------------

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Comparar contraseñas
        const isPasswordMatched = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Generar y devolver el token
        const payload = { id: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const { password_hash, ...userResult } = user;

        return { accessToken, user: userResult };
    }
}