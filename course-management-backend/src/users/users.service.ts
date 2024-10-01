import { Get, Injectable, UseGuards } from '@nestjs/common';
import { User } from 'src/types/types';
import { UserDocument, UserSchema } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthMiddleware } from 'src/auth/auth.middleware';
// import db mongodb

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    try {
      const createdUser = new this.userModel(user);
      return createdUser.save();
    } catch (err) {
      return err;
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
