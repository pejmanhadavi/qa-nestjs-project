import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createQuestion(createQuestionDto: CreateQuestionDto, categoryId: number, user: UserEntity): Promise<QuestionEntity> {
        const author: UserEntity = user;
        const category: CategoryEntity = await this.categoryRepository.findOne({ id: categoryId });
        const question: QuestionEntity = await this.questionRepository.create({
            ...createQuestionDto,
            category,
            author,
        });
        await this.questionRepository.save(question);
        return question;
    }

    async getAllQuestions(): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            relations: ['author', 'category']
        });
    }

    async getQuestionsByCategory(categoryId: number): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            where: {category: categoryId},
            relations: ['author', 'category']
        });
    }

    async getQuestionById(questionId): Promise<QuestionEntity> {
        return await this.questionRepository.findOne({
            where: {id: questionId},
            relations: ['author', 'category'],
        });
    }

    async getMyQuestions(user): Promise<QuestionEntity[]> {
        return await this.questionRepository.find({
            where: {author: user.id},
            relations: ['category', 'answers'],
        });
    }
}
