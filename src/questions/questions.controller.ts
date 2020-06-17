import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
    ) { }

    @Post('categories/:categoryId')
    @UseGuards(AuthGuard('jwt'))
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto, @Param() param , @Req() req) {
        return this.questionsService.createQuestion(createQuestionDto, param.categoryId, req.user);
    }

    @Get()
    async getAllQuestions() {
        return await this.questionsService.getAllQuestions();
    }

    @Get('categories/:categoryId')
    async getAllQuestionsByCategory(@Param() param) {
        return await this.questionsService.getQuestionsByCategory(param.categoryId);
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
