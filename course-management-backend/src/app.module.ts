import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://root:password@localhost:27017/coursesdb?authSource=admin'),
    UsersModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
