import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user: User = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Lấy _id từ user và chuyển sang chuỗi nếu cần
    const payload = {
      id: user._id.toString(), // Chuyển _id thành chuỗi
      username: user.username,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'refresh_token_secret', // Bí mật khác với Access Token
      expiresIn: '7d',
    });

    // Lưu Refresh Token vào cơ sở dữ liệu
    await this.userService.updateRefreshToken(user._id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    // Kiểm tra Refresh Token trong cơ sở dữ liệu
    const user = await this.userService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Tạo Access Token mới
    const payload = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    }; // Chuyển _id thành chuỗi
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return {
      access_token: newAccessToken,
    };
  }
}
