import { Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterLoginUserDto } from './dtos/register-login.dto';


@Controller('users')
export class UsersController { 
    constructor(private readonly usersService: UsersService) { }


    @Post()
    register() {
        return 'registered.';
    }

    @Post()
    login() {
        return 'logged in.';
    }
 }
