// token.middleware.ts future to fix.
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

enum AccessPoint {
  Token = '123',
};

@Injectable()
export class TokenMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token = authHeader.substring(7); 
    
    try {

      let validate : string = AccessPoint.Token;

      if (token === validate) {
        next();
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
