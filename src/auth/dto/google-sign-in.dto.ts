import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleSignInDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'nome_do_usuario',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'url_da_imagem_do_perfil',
  })
  image: string;
}