import { IsString, IsNotEmpty, MinLength, MaxLength, IsArray, IsUUID, IsOptional } from 'class-validator';

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    // --- NUEVO CAMPO PARA LOS MIEMBROS ---
    @IsArray()
    @IsUUID('4', { each: true }) // Valida que cada elemento del array sea un UUID v4
    @IsOptional()
    memberIds?: string[]; // Array de IDs de los usuarios (UUIDs)
}