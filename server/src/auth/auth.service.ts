import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
}