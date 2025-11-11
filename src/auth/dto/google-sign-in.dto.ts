import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleSignInDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exemplo_de_token',
  })
  access_token: string;
}