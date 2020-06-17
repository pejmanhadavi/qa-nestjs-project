import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
    ) { }

    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
        const question: QuestionEntity = await this.questionRepository.create(createQuestionDto);
        await this.questionRepository.save(question);
        return question;
    }
}
