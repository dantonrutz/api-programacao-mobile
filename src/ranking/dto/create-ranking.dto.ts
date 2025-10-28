import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateRankingDto {
    @IsInt()
    position: number;

    @IsInt()
    score?: number;

    @IsInt()
    classroomId: number;

    @IsString()
    userId: string;
}
