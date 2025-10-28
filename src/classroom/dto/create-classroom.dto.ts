// src/classroom/dto/create-classroom.dto.ts
import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray } from 'class-validator';

export class CreateClassroomDto {
    @IsString() @IsNotEmpty()
    name: string;

    @IsString() @IsNotEmpty()
    code: string;

    @IsString() @IsNotEmpty()
    teacherId: string;

    // optional list of student ids to connect
    @IsArray()
    @IsOptional()
    studentIds?: string[];
}
