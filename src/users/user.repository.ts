import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) // ← Cần decorator này!
        private readonly userRepository: MongoRepository<User>
    ) { }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: string) {
        return this.userRepository.findOneBy({ _id: id });
    }

    async createUser(user: any): Promise<User> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        console.log('user', user);
        return this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        await this.userRepository.update(id, updateUserDto);
        return this.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async deleteManyUsers(ids: string[]): Promise<void> {
        await this.userRepository.deleteMany({ _id: { $in: ids } });
    }
}