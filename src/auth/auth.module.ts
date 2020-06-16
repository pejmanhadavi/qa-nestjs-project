import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'verysecretpassword',
            signOptions: {
                expiresIn: '30d',
            },
        }),
    ]
})
export class AuthModule { }
