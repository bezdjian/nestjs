import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coursename: string;

  @Column()
  description: string;

  @Column()
  idnumber: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: 1 })
  categoryid: number;

  @Column()
  price: number;
}
