import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

interface CustomRequest extends Request {
  session?: {
    user?: any;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    // get jwt from bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('User not authenticated');
    }
    const token = authHeader.split(' ')[1];
    // check if token is valid
    const jwtService = new JwtService({});
    let isLoggedIn = false;
    console.log('token', token);
    try {
      console.log('decoded');
      const decoded = jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log('decoded', decoded);
      isLoggedIn = true;
    } catch (err) {
      console.log('error', err);
      throw new UnauthorizedException('User not authenticated');
    }
    if (!isLoggedIn) {
      throw new UnauthorizedException('User not authenticated');
    }

    next(); // Call the next middleware or route handler
  }
}
