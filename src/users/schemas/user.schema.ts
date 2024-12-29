import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document; // Kế thừa Document để có _id và các phương thức của Mongoose

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // Phân quyền: 'admin' hoặc 'user'
  role: string;

  @Prop({ default: null }) // Lưu Refresh Token, có thể null nếu chưa đăng nhập
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
