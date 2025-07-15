// backend/src/auth/dto/register-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6) // Longitud mínima para la contraseña
  password: string;

  @IsString()
  full_name?: string;
}
