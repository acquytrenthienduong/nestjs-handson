import {Entity, Column, ObjectIdColumn} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Role } from 'src/enum/role.enum';

@Entity('users') // ← Chỉ định tên collection chính xác
export class User {
    @ObjectIdColumn()
    _id: ObjectId; // ← Sử dụng ObjectId type

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role; // ← Thêm field role
}
