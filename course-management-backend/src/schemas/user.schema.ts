import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: 'admin' | 'author' | 'reader';
}

export const UserSchema = SchemaFactory.createForClass(User);
