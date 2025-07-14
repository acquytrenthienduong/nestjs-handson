import {Entity, Column, ObjectIdColumn} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users') // ← Chỉ định tên collection chính xác
export class User {
    @ObjectIdColumn()
    _id: ObjectId; // ← Sử dụng ObjectId type

    @Column()
    email: string;

    @Column()
    password: string;
}
