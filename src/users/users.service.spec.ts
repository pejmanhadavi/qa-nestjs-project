import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const user = new UserEntity();
user.id = 1;
user.username = 'username';
user.password = 'verysecretpassword';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepo: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockImplementation((options) => {
              if (options.id && options.id === 1)
                return user;
              if (options.username && options.username === 'username')
                return user
              return null
            }),
            create: jest.fn().mockResolvedValue(user),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('register', () => {
    it('should not register if username exists', async () => {
      await expect(usersService.register({ username: 'username', password: 'secretpass' })).rejects.toThrow();
    });
    it('should register user if username does not exists', async () => {
      const token = await usersService.register({username: 'another username', password: 'secretpass'});
      expect(token).toBeDefined();
    });
  });

  describe('login', () => {

  });

  describe('findUserById', () => {

  });
});
