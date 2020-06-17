import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';


@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createAnswer(questionId, user, createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
        const author: UserEntity = user;
        const question: QuestionEntity = await this.questionRepository.findOne({ id: questionId });
        const answer: AnswerEntity = await this.answerRepository.create({
            ...createAnswerDto,
            question,
            author,
        });
        await this.questionRepository.save(question);
        return answer;
    }
}
