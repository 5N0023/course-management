import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import e from 'express';

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
      const payload = { username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: 'secretKey'
        }),
      };
    } catch (err) {
      // return response with error message
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async register(username: string, password: string): Promise<any> {
    try {
      // use bcrypt to hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersService.create({
        username,
        password: hashedPassword,
      });
      if (!user) {
        throw new BadRequestException('User already exists');
      }
      // login user after registration
      return await this.login(username, password);
    } catch (err) {
      throw new BadRequestException('User already exists');
    }
  }
}
