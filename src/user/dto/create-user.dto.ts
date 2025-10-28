import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'Danton Yuri Rutz',
        description: 'O nome do usuário',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'danton.rutz@colegioteutonia.com.br',
        description: 'O email do usuário',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Senha123',
        description: 'A senha do usuário',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: ['STUDENT', 'TEACHER'],
        description: 'Os papéis do usuário',
    })
    @IsArray()
    @IsOptional()
    roles?: string[]; // ex: ['STUDENT', 'TEACHER']
}
