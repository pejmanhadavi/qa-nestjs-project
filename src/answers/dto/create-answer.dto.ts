import { MaxLength } from 'class-validator';

export class CreateAnswerDto {
    @MaxLength(1024)
    description: string;
}