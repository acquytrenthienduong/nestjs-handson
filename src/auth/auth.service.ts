import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string) {
        console.log('email', email);
        console.log('password', password);
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log('user', user);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log('isPasswordValid', isPasswordValid);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { 
            sub: user.email, 
            username: user.email,
            role: user.role // ← Thêm role vào payload
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
