import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.email, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
