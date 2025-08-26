import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchUserDTO {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'danton@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Danton Yuri Rutz',
  })
  name: string;

  @IsString()
  @IsOptional()
  image: string;
}
