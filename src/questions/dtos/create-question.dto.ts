import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Category } from 'src/categories/interfaces/category.interface';
import { User } from 'src/users/interfaces/user.interface';

export class CreateQuestionDto {

    @IsString()
    @MaxLength(256)
    readonly title: string;

    @IsString()
    @MaxLength(256)
    readonly description: string;

    @IsNumber()
    readonly category: Category;

    @IsNumber()
    readonly author: User;
}