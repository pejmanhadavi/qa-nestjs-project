import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { AnswersService } from './answers.service';
import { UserEntity } from '../users/entities/user.entity';
import { QuestionEntity } from '../questions/entities/question.entity';
import { AnswerEntity } from './entities/answer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const question = new QuestionEntity();
question.id = 1;
question.title = 'example title';
question.description = 'exmaple discription';

const user = new UserEntity();
user.id = 1;
user.username = 'sample username';
user.password = 'verysecretpassword'

const answer = new AnswerEntity();
answer.id = 1;
answer.question = question;
answer.author = user;
answer.description = 'some descriptions';


describe('AnswersService', () => {
  let answersService: AnswersService;
  let userRepo: Repository<UserEntity>
  let questionRepo: Repository<QuestionEntity>
  let answerRepo: Repository<AnswerEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {}
        },
        {
          provide: getRepositoryToken(QuestionEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(question),
          }
        },
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: {
              save: jest.fn(),
              create: jest.fn().mockReturnValue(answer),
          }
        },
      ],
    }).compile();

    answersService = module.get<AnswersService>(AnswersService);

    userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    questionRepo = module.get<Repository<QuestionEntity>>(getRepositoryToken(QuestionEntity));
    answerRepo = module.get<Repository<AnswerEntity>>(getRepositoryToken(AnswerEntity));
  });

  it('should be defined', () => {
    expect(answersService).toBeDefined();
  });

  describe('createAnswer', () => {
    it('should create answer', async () => {
      const answer = await answersService.createAnswer(1, user, {
        description: 'some descriptions',
      });
      expect(answer).toBeDefined();
      expect(answer).toBe(answer);
      expect(questionRepo.findOne).toBeCalledTimes(1);
    });
  })
});
