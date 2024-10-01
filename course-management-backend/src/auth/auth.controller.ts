import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.register(
      signUpDto.username,
      signUpDto.password,
      signUpDto.role,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('checkToken')
  checkToken() {
    return 'Token is valid';
  }
}
