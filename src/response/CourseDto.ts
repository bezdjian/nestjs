import { Student } from '../student/student.entity';
import { Category } from '../category/category.entity';
import { Course } from '../course/courses.entity';

export class CourseDto {
  id: number;
  coursename: string;
  description: string;

  idnumber: string;
  image: string;
  price: number;
  students: Student[];
  category: Category;

  constructor(course: Course) {
    this.id = course.id;
    this.coursename = course.coursename;
    this.description = course.description;
    this.idnumber = course.idnumber;
    this.image = course.image;
    this.price = course.price;
    this.students = course.students;
    this.category = course.category;
  }
}
