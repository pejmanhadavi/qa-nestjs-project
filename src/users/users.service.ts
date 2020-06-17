import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

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

    async register(registerDto: RegisterLoginUserDto): Promise<string> {
        const user: User = await this.findUserByUsername(registerDto.username);
        if (user) {
            throw new BadRequestException('Choose another username.');
        }
        const newUser: User = await this.createUser(registerDto);
        const token: string = this.createAccessToken(newUser.id);
        return token;
    }

    async login(loginDto: RegisterLoginUserDto) {
        // Find user
        // Check password
        // generate jwt
    }

    async findUserById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne({ id });
        if (!user)
            throw new UnauthorizedException();
        return user;
    }

    private async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }

    private async createUser(data: RegisterLoginUserDto): Promise<User> {
        const user: User = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    private createAccessToken(userId: number): string {
        const accessToken = sign({ userId }, 'verysecretpassword', { expiresIn: '30d' });
        return accessToken;
    }

}
