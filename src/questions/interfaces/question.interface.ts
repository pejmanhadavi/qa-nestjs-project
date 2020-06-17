import { UserEntity } from "src/users/entities/user.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { AnswerEntity } from "src/answers/entities/answer.entity";
import { User } from "src/users/interfaces/user.interface";
import { Answer } from "src/answers/interfaces/answer.interface";

export interface Question {
    id: number;
    title: string;
    description: string;
    created: Date;
    category: CategoryEntity;
    author: User;
    answers: Answer[];
}