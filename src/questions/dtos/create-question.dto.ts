import { IsString, MaxLength, IsNumber } from 'class-validator';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateQuestionDto {

    @IsString()
    @MaxLength(256)
    readonly title: string;

    @IsString()
    @MaxLength(256)
    readonly description: string;
}