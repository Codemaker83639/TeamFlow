import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
// --- CAMBIO EN LA SIGUIENTE LÍNEA ---
import { UserRole } from '../../auth/entities/user.enums'; // Apuntamos al nuevo archivo de enums

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}