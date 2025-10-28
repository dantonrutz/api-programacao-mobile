// src/answer/dto/create-answer.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class CreateAnswerDto {
    @IsString() @IsNotEmpty()
    selected: string;

    @IsBoolean()
    correct: boolean;

    @IsString()
    userId: string;

    @IsInt()
    exerciseId: number;
}
