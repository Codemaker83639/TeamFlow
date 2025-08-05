import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'; // Añadimos NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/user.entity';
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

        const userRole = role || UserRole.MEMBER;

        const user = this.userRepository.create({
            email,
            username,
            password_hash: password,
            full_name: fullName,
            role: userRole,
        });

        const savedUser = await this.userRepository.save(user);

        const { password_hash, ...result } = savedUser;
        return result;
    }

    async findAll() {
        return this.userRepository.find({
            select: ['id', 'full_name', 'email', 'role'],
        });
    }

    // --- MÉTODO PARA ELIMINAR (AÑADIDO) ---
    async remove(id: string) {
        // --- PASO DE DEPURACIÓN 1 ---
        console.log(`--- INTENTANDO ELIMINAR USUARIO CON ID: ${id} ---`);
        console.log(`--- TIPO DE DATO DEL ID RECIBIDO: ${typeof id} ---`);

        const result = await this.userRepository.delete(id);

        // --- PASO DE DEPURACIÓN 2 ---
        console.log('--- RESULTADO DE LA OPERACIÓN DELETE DE TYPEORM:', result);

        if (result.affected === 0) {
            // Si affected es 0, significa que no se encontró ninguna fila para eliminar.
            throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
        }
    }
}