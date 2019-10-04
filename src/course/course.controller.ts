import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './courses.entity';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/get/:id')
  async get(@Param() params) {
    return this.courseService.getCourse(params.id).then(c => {
      if (c == null) {
        const err = 'Course with ID ' + params.id + ' not found';
        Logger.error(err);
        throw new NotFoundException(err);
      } else {
        Logger.log('***** Returning a course with id ' + params.id);
        return c;
      }
    });
  }
  @Get('/all')
  async getAll() {
    Logger.log('***** Getting all courses');
    return this.courseService.getCourses();
  }

  @Post('/save')
  savve(@Body() course: Course) {
    return this.courseService.saveCourse(course).catch(err => {
      Logger.error(err);
      throw new InternalServerErrorException(err.message);
    });
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.courseService.deleteCourse(params.id);
  }
}
