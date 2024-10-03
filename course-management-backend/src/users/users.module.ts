import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
