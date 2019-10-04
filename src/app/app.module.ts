import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from '../course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CourseModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
