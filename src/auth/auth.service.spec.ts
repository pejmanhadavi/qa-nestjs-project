import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';


describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    service = new AuthService(userService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
