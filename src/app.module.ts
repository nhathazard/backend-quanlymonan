import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { FoodModule } from './food/food.module';

@Module({
  imports: [AuthModule, FoodModule, PassportModule],
  providers: [JwtStrategy],
})
export class AppModule {}
