import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/user.entity'; // Importa UserRole
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const { email, username, password, fullName, role } = createUserDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Asigna el rol por defecto de forma segura
        const userRole = role || UserRole.MEMBER;

        const user = this.userRepository.create({
            email,
            username,
            password_hash: password,
            full_name: fullName,
            role: userRole,
        });

        const savedUser = await this.userRepository.save(user);

        // Asegúrate de que la desestructuración coincida con la propiedad de la entidad
        const { password_hash, ...result } = savedUser;
        return result;
    }

    async findAll() {
        return this.userRepository.find({
            select: ['id', 'full_name', 'email', 'role'],
        });
    }
}