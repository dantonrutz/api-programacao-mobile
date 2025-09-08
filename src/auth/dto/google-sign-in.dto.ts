import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class GoogleSignInDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'danton.rutz@colegioteutonia.com.br',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Danton Yuri Rutz',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  image: string
}