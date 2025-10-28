import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProgressDto {
    @IsInt()
    @IsOptional()
    xp?: number;

    @IsInt()
    @IsOptional()
    streak?: number;

    @IsString()
    userId: string;
}
