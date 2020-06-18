import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { QuestionEntity } from './entities/question.entity';
import { CategoryEntity } from '../categories/entities/category.entity';

describe('QuestionsService', () => {
  let questionsService: QuestionsService;

  let userRepo: Repository<UserEntity>
  let questionRepo: Repository<QuestionEntity>
  let categoryRepo: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {}
        },
        {
          provide: getRepositoryToken(QuestionEntity),
          useValue: {
          }
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
          }
        },
      ],
    }).compile();

    questionsService = module.get<QuestionsService>(QuestionsService);
    userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    questionRepo = module.get<Repository<QuestionEntity>>(getRepositoryToken(QuestionEntity));
    categoryRepo = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(questionsService).toBeDefined();
  });
});
