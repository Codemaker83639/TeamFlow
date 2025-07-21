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
        private readonly jwtService: JwtService, // <-- Inyecta el JwtService
    ) { }

    async register(registerDto: RegisterAuthDto) {
        // ... tu método de registro actual ...
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

    // --- AÑADE ESTE NUEVO MÉTODO ---
    async login(loginDto: LoginAuthDto) {
        const { email, password } = loginDto;

        // 1. Buscar usuario por email
        const user = await this.userRepository.findOne({ where: { email } });
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

        return { accessToken };
    }
}