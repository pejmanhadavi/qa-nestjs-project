import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionEntity } from 'src/questions/entities/question.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { AnswerEntity } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, QuestionEntity, UserEntity]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
