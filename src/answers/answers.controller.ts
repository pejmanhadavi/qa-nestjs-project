import { Controller, Post, UseGuards, Body, Param, Req } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswersController {
    constructor(
        private readonly answersService: AnswersService,
    ) { }

    @Post(':questionId')
    @UseGuards(AuthGuard('jwt'))
    async createAnswer(@Body() createAnswerDto: CreateAnswerDto, @Param() Param, @Req() req){
        return this.answersService.createAnswer(Param.questionId, req.user, createAnswerDto);
    }
}
