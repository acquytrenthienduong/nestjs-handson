import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('reports')
export class Report {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    price: number;

    @Column()
    make: string;
}