import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string; // Đảm bảo rằng tên ảnh được lưu vào đây
}
