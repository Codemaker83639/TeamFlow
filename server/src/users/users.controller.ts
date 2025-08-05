import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    // --- MÉTODO PARA ELIMINAR (CORREGIDO Y EN SU LUGAR CORRECTO) ---
    @Delete(':id')
    @Roles(UserRole.ADMIN) // Solo los administradores pueden eliminar
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}