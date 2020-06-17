import { MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @MaxLength(1024)
    description: string;
}