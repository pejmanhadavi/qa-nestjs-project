import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import { RegisterLoginUserDto } from './dtos/register-login.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    // ┌─┐┬ ┬┌┐ ┬  ┬┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    // ├─┘│ │├┴┐│  ││    │││├┤  │ ├─┤│ │ ││└─┐
    // ┴  └─┘└─┘┴─┘┴└─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    async findUserByUsername(username: string): Promise<User> {
        const user: User = await this.userRepository.findOne({ username });
        if (!user)
            throw new NotFoundException();
        return user;
    }

    async findUserById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne({ id });
        if (!user)
            throw new UnauthorizedException();
        return user;
    }
}
