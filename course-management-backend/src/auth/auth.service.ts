import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findOne(username);
      // check password hash
      if (!user || !(await bcrypt.compare(pass, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { username: user.username, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (err) {
      return err.message || 'an error occurred';
    }
  }
  async register(
    username: string,
    password: string,
    role: 'admin' | 'author' | 'reader',
  ): Promise<any> {
    try {
      // use bcrypt to hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersService.create({
        username,
        password: hashedPassword,
        role,
      });
      if (!user) {
        throw new Error('User creation failed');
      }
      // login user after registration
      return await this.login(username, password);
    } catch (err) {
      return err || 'an error occurred';
    }
  }
}
