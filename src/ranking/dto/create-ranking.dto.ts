import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateRankingDto {
    @IsInt()
    position: number;

    @IsInt()
    score?: number;

    @IsString()
    classroomId: string;

    @IsString()
    userId: string;
}
