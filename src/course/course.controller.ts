import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CourseDto } from '../response/CourseDto';
import { ResponseDto } from '../response/ResponseDto';
import { CourseService } from './course.service';
import { Course } from './courses.entity';

@Controller('course')
export class CourseController {
  endpoints = ['Endoints', ['/get/:id', '/all', '/save', ':id']];

  constructor(private courseService: CourseService) {}

  // Default
  @Get('/')
  default() {
    return this.endpoints;
  }

  @Get('/get/:id')
  async get(@Param() params, @Res() res) {
    return this.courseService
      .getCourse(params.id)
      .then(c => {
        if (c == null) {
          const err = 'Course with ID ' + params.id + ' not found';
          Logger.error(err);
          res
            .status(HttpStatus.NOT_FOUND)
            .json(new ResponseDto(404, err))
            .send();
        } else {
          Logger.log('***** Returning a course with id ' + params.id);
          Logger.log(c);
          res
            .status(HttpStatus.OK)
            .json(new CourseDto(c))
            .send();
        }
      })
      .catch(err => {
        Logger.error(err);
        throw new InternalServerErrorException(err.message);
      });
  }

  @Get('/all')
  async getAll() {
    Logger.log('***** Getting all courses');
    return this.courseService.getCourses().then(courses => {
      Logger.log(courses);
      const dtoList = new Array();
      courses.map(c => {
        dtoList.push(new CourseDto(c));
      });
      return dtoList;
    });
  }

  @Post('/save')
  async save(@Body() course: Course) {
    return this.courseService.saveCourse(course).catch(err => {
      Logger.error(err);
      throw new InternalServerErrorException(err.message);
    });
  }

  @Delete('/delete/:id')
  async deleteUser(@Param() params, @Res() res) {
    return this.courseService
      .deleteCourse(params.id)
      .then(c => {
        if (c.affected > 0) {
          const msg = 'Course with ID ' + params.id + ' deleted!';
          Logger.log(msg);
          return res
            .status(HttpStatus.OK)
            .json(new ResponseDto(200, msg))
            .send();
        }
        return res
          .status(HttpStatus.NOT_FOUND)
          .json(
            new ResponseDto(404, 'Course with ID ' + params.id + ' not found'),
          )
          .send();
      })
      .catch(err => {
        Logger.error(err);
        throw new InternalServerErrorException(err.message);
      });
  }
}
