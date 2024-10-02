import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  createCourse(@Body() course: Record<string, any>) {
    return this.courseService.createCourse(
      course.title,
      course.description,
      course.instructor,
      course.schedule,
    );
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('/FromJson')
  FromJson() {
    return this.courseService.addCourseFromJson();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  getCourses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') query: string = '',
  ) {
    return this.courseService.getCourses(page, limit,query);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/deleteAll')
  deleteAllCourses() {
    return this.courseService.deleteAllCourses();
  }
}
