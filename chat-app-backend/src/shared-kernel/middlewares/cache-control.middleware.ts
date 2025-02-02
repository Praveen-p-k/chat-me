import { Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NoCacheMiddleware implements NestMiddleware {
  use(_: Request, res: Response, next: NextFunction) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    next();
  }
}
