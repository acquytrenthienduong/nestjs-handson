import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    // READ - Cả admin và sub_admin đều được xem danh sách user
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin, Role.SubAdmin)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    // READ - Cả admin và sub_admin đều được xem chi tiết user
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    @Roles(Role.Admin, Role.SubAdmin)
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    // CREATE - Chỉ admin mới được tạo user
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    @Roles(Role.Admin)
    createUser(@Body() body: CreateUserDto) {
        console.log('body', body);
        return this.usersService.createUser(body);
    }

    @Public()
    @Post('register')
    register(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body);
    }

    // UPDATE - Cả admin và sub_admin đều được cập nhật user
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    @Roles(Role.Admin, Role.SubAdmin)
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // DELETE - Chỉ admin mới được xóa user
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    @Roles(Role.Admin)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

    // DELETE - Chỉ admin mới được xóa nhiều user
    @UseGuards(AuthGuard, RolesGuard)
    @Delete()
    @Roles(Role.Admin)
    deleteManyUsers(@Body() body: { ids: string[] }) {
        return this.usersService.deleteManyUsers(body.ids);
    }
}
