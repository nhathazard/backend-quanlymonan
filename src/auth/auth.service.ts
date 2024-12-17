import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jsonfile from 'jsonfile';
import * as path from 'path';

@Injectable()
export class AuthService {
  private dataFile = path.join(__dirname, '..', '..', 'data.json');

  constructor(private jwtService: JwtService) {}

  // Đăng nhập
  async login(username: string, password: string) {
    const { users } = await jsonfile.readFile(this.dataFile);
    const user = users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const payload = { username: user.username, role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
