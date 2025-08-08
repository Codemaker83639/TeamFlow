import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Se importa el DTO para actualizar

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

    async remove(id: string) {
        // Se limpiaron los console.log de depuración
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
        }
    }

    // --- NUEVO MÉTODO PARA ACTUALIZAR ---
    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
        }

        // Mapeamos los campos del DTO a la entidad de forma segura
        if (updateUserDto.fullName) user.full_name = updateUserDto.fullName;
        if (updateUserDto.username) user.username = updateUserDto.username;
        if (updateUserDto.email) user.email = updateUserDto.email;
        if (updateUserDto.role) user.role = updateUserDto.role;
        // Si se envía una nueva contraseña, se la pasamos a la entidad para que el hook la hashee
        if (updateUserDto.password) user.password_hash = updateUserDto.password;

        try {
            const savedUser = await this.userRepository.save(user);
            const { password_hash, ...result } = savedUser;
            return result;
        } catch (error) {
            if (error.code === '23505') { // Error de unicidad de PostgreSQL
                throw new ConflictException('El email o nombre de usuario ya existe.');
            }
            throw error;
        }
    }
}