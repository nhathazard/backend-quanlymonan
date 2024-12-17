import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('food')
export class FoodsController {
  constructor(private foodService: FoodService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllFoods() {
    return this.foodService.getAllFoods();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  addFood(@Body() food: { name: string; description: string }, @Request() req) {
    return this.foodService.addFood(food, req.user.role);
  }
}
