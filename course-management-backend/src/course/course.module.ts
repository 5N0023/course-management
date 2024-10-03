import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from 'src/schemas/course.schema';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    AuthModule,
    UsersModule,
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .forRoutes(CourseController);
  }
}
