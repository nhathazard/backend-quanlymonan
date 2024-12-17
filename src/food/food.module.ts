import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodsController } from './food.controller';

@Module({
  controllers: [FoodsController],
  providers: [FoodService],
})
export class FoodModule {}
