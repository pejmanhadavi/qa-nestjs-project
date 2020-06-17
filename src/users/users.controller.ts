import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { RegisterLoginUserDto } from './dtos/register-login.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post('register')
    async register(@Body() registerDto: RegisterLoginUserDto) {
        return this.usersService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: RegisterLoginUserDto) {
        return this.usersService.login(loginDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    checkauth() {
        return 'authenticated.';
    }
}
