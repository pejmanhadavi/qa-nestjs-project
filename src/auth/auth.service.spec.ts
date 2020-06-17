import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

const user = new UserEntity();
user.id = 1;
user.username = 'sample username';
user.password = 'verysecretpassword'

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userRepo: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          }
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user', async () => {
      const givenUser = await authService.validateUser({ id: 1 });
      expect(givenUser).toEqual(user);
      expect(userRepo.findOne).toBeCalledTimes(1);
      expect(userRepo.findOne).toBeCalledWith({id: 1});
    });
  });
});
