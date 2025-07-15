import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    createUser(user: CreateUserDto) {
        return this.userRepository.createUser(user);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userRepository.updateUser(id, updateUserDto);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }

    deleteManyUsers(ids: string[]) {
        return this.userRepository.deleteManyUsers(ids);
    }
}
