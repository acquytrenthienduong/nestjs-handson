import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';



@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}
    
    @Public()
    @Get()
    getAllUsers() {
        console.log('getAllUsers');
        return this.usersService.getAllUsers();
    }

    // @UseGuards(AuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    // @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() body: CreateUserDto) {
        console.log('body', body);
        return this.usersService.createUser(body);
    }
}
