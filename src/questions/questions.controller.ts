import { Controller, Post, Get, Body } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
    ) { }

    @Post()
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionsService.createQuestion(createQuestionDto);
    }

    @Get()
    async getAllQuestions() {
        return;
    }

    @Get('category/:categoryId')
    async getAllQuestionsByCategory() {
        return;
    }

    @Get(':questionId')
    async getQuestion() {
        return;
    }

    @Get('myQuestions')
    async getUserAllQuestions() {
        return;
    }
}
