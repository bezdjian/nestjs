import {
  Controller,
  Get,
  Param,
  Logger,
  NotFoundException,
  Post,
  Body,
  InternalServerErrorException,
  Res,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { ResponseDto } from '../response/ResponseDto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/get/:id')
  async get(@Param() params, @Res() res) {
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

  @Delete('/delete/:id')
  async delete(@Param() params, @Res() res) {
    return this.studentService.delete(params.id)
    .then(c => {
      if (c.affected > 0) {
        const msg = 'Student with ID ' + params.id + ' deleted!';
        Logger.log(msg);
        return res
          .status(HttpStatus.OK)
          .json(new ResponseDto(200, msg))
          .send();
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(
          new ResponseDto(404, 'Student with ID ' + params.id + ' not found'),
        )
        .send();
    })
    .catch(err => {
      Logger.error(err);
      throw new InternalServerErrorException(err.message);
    });
  }
}
