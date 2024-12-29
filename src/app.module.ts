import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { FoodModule } from './food/food.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    FoodModule,
    PassportModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:123@database.ka7o52o.mongodb.net/food?retryWrites=true&w=majority&appName=database',
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Đường dẫn tới thư mục chứa ảnh
      serveRoot: '/uploads', // Định tuyến URL cho thư mục uploads
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
