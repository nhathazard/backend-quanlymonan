import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // API đăng ký người dùng mới
  @Post('register')
  async register(
    @Body() body: { username: string; password: string; role?: string },
  ): Promise<{ message: string }> {
    const { username, password, role } = body;

    // Tạo người dùng mới
    await this.userService.createUser(username, password, role || 'user');
    return { message: 'User registered successfully' };
  }
}
