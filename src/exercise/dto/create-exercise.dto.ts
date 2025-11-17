// src/exercise/dto/create-exercise.dto.ts
import { IsString, IsNotEmpty, IsArray, IsOptional, IsInt } from 'class-validator';

export class CreateExerciseDto {
    @IsString() @IsNotEmpty()
    question: string;

    @IsArray()
    options: string[];

    @IsString() @IsNotEmpty()
    answer: string;

    @IsString() @IsNotEmpty()
    theme: string;

    @IsString() @IsNotEmpty()
    authorId: string;

    @IsString() @IsOptional()
    classroomId?: string;
}
