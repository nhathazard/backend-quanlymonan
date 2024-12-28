import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('food')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Thêm món ăn (cả admin và user đều có thể thêm)
  @Post()
  async createFood(
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.foodService.createFood(body.name, body.description, body.price);
  }

  // Lấy danh sách món ăn (cả admin và user đều có thể xem)
  @Get()
  async getAllFoods() {
    return this.foodService.findAll();
  }

  // Lấy chi tiết món ăn
  @Get(':id')
  async getFoodById(@Param('id') id: string) {
    return this.foodService.findOneById(id);
  }

  // Sửa món ăn (chỉ admin)
  @Put(':id')
  @Role('admin')
  async updateFood(
    @Param('id') id: string,
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.foodService.updateFood(
      id,
      body.name,
      body.description,
      body.price,
    );
  }

  // Xóa món ăn (chỉ admin)
  @Delete(':id')
  @Role('admin')
  async deleteFood(@Param('id') id: string) {
    await this.foodService.deleteFood(id);
    return { message: 'Food deleted successfully' };
  }
}
