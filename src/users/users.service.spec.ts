import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const user = new UserEntity();
user.id = 1;
user.username = 'username';

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
    user.password = await bcrypt.hash('verysecretpassword', 10);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('register', () => {
    it('should not register if username exists', async () => {
      await expect(usersService.register({ username: 'username', password: 'verysecretpassword' })).rejects.toThrow();
    });
    it('should register user if username does not exists', async () => {
      const token = await usersService.register({ username: 'another username', password: 'verysecretpassword' });
      expect(token).toBeDefined();
    });
  });

  describe('login', () => {
    it('should not login if username does not exist.', async () => {
      await expect(usersService.login({ username: 'another username', password: 'verysecretpassword' })).rejects.toThrow();
    });
    it('should login if username exists.', async () => {
      const token = await usersService.login({ username: 'username', password: 'verysecretpassword' });
      expect(token).toBeDefined();
    });
    it('should not login with wrong password.', async () => {
      await expect(usersService.login({ username: 'username', password: 'wrong pass' })).rejects.toThrow();
    });
  });

  describe('findUserById', () => {
    it('should return user if exists', async () => {
      const user = await usersService.findUserById(1);
      expect(user).toBe(user);
    });
    it('should not return user if does not exist', async () => {
      await expect(usersService.findUserById(2)).rejects.toThrow();
    });
  });
});
