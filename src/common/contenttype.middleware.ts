import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class JsonContentTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Accept', 'application/json');
    req.headers.accept = 'application/json';
    next();
  }
}
