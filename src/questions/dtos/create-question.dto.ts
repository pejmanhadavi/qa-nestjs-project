import { IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateQuestionDto {

    @IsString()
    @MaxLength(256)
    readonly title: string;

    @IsString()
    @MaxLength(256)
    readonly description: string;
}