import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CredentialsSignInDTO {
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
}