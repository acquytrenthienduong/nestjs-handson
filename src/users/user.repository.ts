import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) // ← Cần decorator này!
        private readonly userRepository: MongoRepository<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: string) {
        return this.userRepository.findOneBy({ _id: id });
    }

    async createUser(user: any): Promise<User> {
        return this.userRepository.save(user);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }
}