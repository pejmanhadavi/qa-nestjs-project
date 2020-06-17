import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, CategoryEntity, UserEntity]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
