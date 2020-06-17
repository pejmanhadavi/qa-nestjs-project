import { Question } from "src/questions/interfaces/question.interface";

export interface Category {
    id: number,
    name: string;
    questions: Question[];
  }