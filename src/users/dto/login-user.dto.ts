// backend/src/auth/dto/login-user.dto.ts
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
