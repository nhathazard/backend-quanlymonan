import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './schemas/food.schema';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  // Thêm món ăn
  async createFood(
    name: string,
    description: string,
    price: number,
  ): Promise<Food> {
    const newFood = new this.foodModel({ name, description, price });
    return newFood.save();
  }

  // Lấy danh sách món ăn
  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }

  // Lấy chi tiết món ăn
  async findOneById(id: string): Promise<Food> {
    const food = await this.foodModel.findById(id).exec();
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return food;
  }

  // Sửa món ăn
  async updateFood(
    id: string,
    name: string,
    description: string,
    price: number,
  ): Promise<Food> {
    const updatedFood = await this.foodModel
      .findByIdAndUpdate(id, { name, description, price }, { new: true })
      .exec();
    if (!updatedFood) {
      throw new NotFoundException('Food not found');
    }
    return updatedFood;
  }

  // Xóa món ăn
  async deleteFood(id: string): Promise<void> {
    const result = await this.foodModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Food not found');
    }
  }
}
