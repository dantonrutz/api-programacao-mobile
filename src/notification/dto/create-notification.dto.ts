import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
    @IsString() @IsNotEmpty()
    message: string;

    @IsString() @IsNotEmpty()
    type: string;

    @IsString()
    userId: string;
}
