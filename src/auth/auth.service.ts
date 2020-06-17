import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    createAccessToken(userId: number): string {
        const accessToken = sign({ userId }, 'verysecretpassword', { expiresIn: '30d' });
        return accessToken;
    }

    async validateUser(jwtPayload: JwtPayload): Promise<any> {
        const user = await this.usersService.findUserById(jwtPayload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }



    //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
    //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
    //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
    private jwtExtractor(request) {
        const token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
        return token;
    }

    //
    // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    //
    returnJwtExtractor() {
        return this.jwtExtractor;
    }

}
