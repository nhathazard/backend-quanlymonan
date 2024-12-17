import { Injectable, ForbiddenException } from '@nestjs/common';
import * as jsonfile from 'jsonfile';

@Injectable()
export class FoodService {
  private dataFile = 'data.json';

  async getAllFoods() {
    const { foods } = await jsonfile.readFile(this.dataFile);
    return foods;
  }

  async addFood(food: { name: string; description: string }, role: string) {
    if (role !== 'admin') {
      throw new ForbiddenException('Chỉ admin mới được thêm món ăn');
    }
    const data = await jsonfile.readFile(this.dataFile);
    const newFood = { id: Date.now(), ...food };
    data.foods.push(newFood);
    await jsonfile.writeFile(this.dataFile, data);
    return newFood;
  }
}
