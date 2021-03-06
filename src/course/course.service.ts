import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async getCourses(): Promise<Course[]> {
    return await this.courseRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['category'],
    });
  }

  async getCourse(courseId: number): Promise<Course> {
    return await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['category'],
    });
  }

  async saveCourse(course: Course) {
    return this.courseRepository.save(course);
  }

  async deleteCourse(courseId: number) {
    return this.courseRepository.delete(courseId);
  }
}
