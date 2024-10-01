import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    const token = await this.authService.login(
      signInDto.username,
      signInDto.password,
    );

    // Set the cookie in the response
    res.cookie('token', token.access_token, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: '/', // Allow the cookie to be sent to all routes
    });

    return res.send({ message: 'Login successful' });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpDto: Record<string, any>, @Res() res: Response) {
    const token = await this.authService.register(
      signUpDto.username,
      signUpDto.password,
    );

    // Set the cookie in the response
    res.cookie('token', token.access_token, {
      httpOnly: true, // Prevent JavaScript from accessing the cookie
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: '/', // Allow the cookie to be sent to all routes
    });

    return res.send({ message: 'Registration successful' });
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify')
  checkToken() {
    return 'Token is valid';
  }
}
