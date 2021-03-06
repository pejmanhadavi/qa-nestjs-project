import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

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
    private jwtExtractor(request): string {
        let token: string = null;
        if (request.headers.authorization)
            token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
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
