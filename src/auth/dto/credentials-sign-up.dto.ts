import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CredentialsSignUpDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'seu_nome',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'danton.rutz@universo.univates.br',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'senha',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'senha',
  })
  passwordConfirmation: string;
}