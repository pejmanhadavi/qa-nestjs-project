import { MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @MaxLength(256)
    readonly name: string;
}