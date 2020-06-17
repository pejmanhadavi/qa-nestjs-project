import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';
import { RegisterLoginUserDto } from './dtos/register-login.dto';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly authService: AuthService,
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
        const token: string = this.authService.createAccessToken(newUser.id);
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
        return user;
    }

}
