import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

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
}