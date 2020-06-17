import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { RegisterLoginUserDto } from './dtos/register-login.dto';


@Controller('users')
export class UsersController { 
    constructor(private readonly usersService: UsersService) { }


    @Post()
    @UseGuards(AuthGuard('jwt'))
    register() {
        return 'registered.';
    }

    @Post()
    login() {
        return 'logged in.';
    }
 }
