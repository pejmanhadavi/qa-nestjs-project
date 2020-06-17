import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'verysecretpassword',
            signOptions: {
                expiresIn: '30d',
            },
        }),
    ],
    providers: [AuthService, UsersService, JwtStrategy]
})
export class AuthModule { }
