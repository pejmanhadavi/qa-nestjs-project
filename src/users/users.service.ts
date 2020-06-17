import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import { RegisterLoginUserDto } from './dtos/register-login.dto';
import { match } from 'assert';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    // ┌─┐┬ ┬┌┐ ┬  ┬┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    // ├─┘│ │├┴┐│  ││    │││├┤  │ ├─┤│ │ ││└─┐
    // ┴  └─┘└─┘┴─┘┴└─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    async register(registerDto: RegisterLoginUserDto): Promise<object> {
        const user: User = await this.findUserByUsername(registerDto.username);
        if (user) {
            throw new BadRequestException('Choose another username.');
        }
        const newUser: User = await this.createUser(registerDto);
        const token: string = this.createAccessToken(newUser.id);
        return { token };
    }

    async login(loginDto: RegisterLoginUserDto) {
        const user: User = await this.findUserByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('User not found.');
        }
        const match = await this.checkPassword(loginDto.password, user);
        if (!match) {
            throw new UnauthorizedException('Wrong user or password.');
        }
        const token: string = this.createAccessToken(user.id);
        return { token };
    }

    async findUserById(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne({ id });
        if (!user)
            throw new UnauthorizedException();
        return user;
    }

    // ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
    // ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
    // ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    private async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }

    private async createUser(data: RegisterLoginUserDto): Promise<User> {
        const user: User = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    private createAccessToken(id: number): string {
        const accessToken = sign({ id }, 'verysecretpassword', { expiresIn: '30d' });
        return accessToken;
    }

    private async checkPassword(password: string, user: any): Promise<boolean> {
        const match = await bcrypt.compare(password, user.password);
        return match;
    }
}