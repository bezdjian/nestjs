import {
  Controller,
  Get,
  Param,
  Logger,
  NotFoundException,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/get/:id')
  async get(@Param() params) {
    return this.studentService.getStudent(params.id).then(student => {
      if (student == null) {
        const err = 'Student with ID ' + params.id + ' not found';
        Logger.error(err);
        throw new NotFoundException(err);
      } else {
        return student;
      }
    });
  }

  @Get('/all')
  async getAll() {
    Logger.log('***** Getting all Students');
    return this.studentService.getStudents();
  }

  @Post('/save')
  save(@Body() student: Student) {
    return this.studentService.save(student).catch(err => {
      Logger.error(err);
      throw new InternalServerErrorException(err.message);
    });
  }
}
