import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    AuthModule,
    FoodModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
