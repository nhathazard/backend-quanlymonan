import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFoodDto } from './Dto/create-food.dto';
import { diskStorage } from 'multer';

@Controller('food')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Thêm món ăn (cả admin và user đều có thể thêm)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/foods', // Thư mục lưu ảnh
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          const filename = `${file.fieldname}-${uniqueSuffix}.${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createFood(
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = `/uploads/foods/${file.filename}`;
    return this.foodService.createFood({ ...createFoodDto, image: imageUrl });
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
