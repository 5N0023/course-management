import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs/promises';
import { Model } from 'mongoose';
import { CourseDocument } from 'src/schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private courseModel: Model<CourseDocument>,
  ) {}
  async createCourse(
    title: string,
    description: string,
    instructor: string,
    schedule: string,
  ) {
    if (!title || !description || !instructor || !schedule) {
      throw new BadRequestException('Invalid course data');
    }
    try {
      const id = Math.random().toString(36).substr(2, 9);
      const course = new this.courseModel({
        id,
        title,
        description,
        instructor,
        schedule,
      });
      course.save();
    } catch (err) {
      throw new BadRequestException('Error creating course');
    }
    return 'Course created';
  }

  async getCourses(page: number, limit = 10, query: string) {
    try {
      const data = await this.courseModel.find().exec();
      let courses = data.map((course) => course.toObject());
      courses=courses.reverse();
      if (query && query.length != 0)
        courses = courses.filter((course) => course.title.toLowerCase().includes(query.toLowerCase()) || course.instructor.toLowerCase().includes(query.toLowerCase()));
      // slice the result based on the page and limits
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const result = courses.slice(startIndex, endIndex);

      return {
        page: page,
        totalPages: Math.ceil(courses.length / limit),
        data: result,
      };
    } catch (err) {
      throw new Error('Error reading courses data');
    }
  }

  async addCourseFromJson() {
    try {
      const data = await fs.readFile('./src/data/courses_data.json', 'utf8');
      const courses = JSON.parse(data);
      // append the id to each course
      courses.forEach((course) => {
        course.id = Math.random().toString(36).substr(2, 9);
      });
      await this.courseModel.insertMany(courses);
      return courses;
    } catch (err) {
      throw new Error('Error reading courses data');
    }
  }

  async deleteAllCourses() {
    try {
      await this.courseModel.deleteMany({});
      return 'All courses deleted';
    } catch (err) {
      throw new Error('Error deleting courses data');
    }
  }

}
