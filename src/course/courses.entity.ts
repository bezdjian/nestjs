import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';
import { Category } from '../category/category.entity';

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

  @Column()
  price: number;

  @ManyToMany(type => Student)
  public students: Student[];

  @ManyToOne(type => Category, category => category.course, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  public category: Category;
}
