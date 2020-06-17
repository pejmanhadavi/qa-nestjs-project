import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionEntity } from 'src/questions/entities/question.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, CategoryEntity, UserEntity]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
