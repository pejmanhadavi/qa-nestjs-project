import { User } from "src/users/interfaces/user.interface";
import { Question } from "src/questions/interfaces/question.interface";

export interface Answer{
    id: number;
    description: string;
    created: Date;
    author: User[];
    question: Question;
}