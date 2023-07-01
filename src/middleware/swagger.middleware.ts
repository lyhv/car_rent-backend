// swagger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiHeader } from '@nestjs/swagger';

interface CustomRequest extends Request {
  swagger?: {
    document?: {
      headers?: (typeof ApiHeader)[];
    };
  };
}

@Injectable()
export class SwaggerMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    // Add the @ApiHeader decorator to the request object
    if (!req.swagger) {
      req.swagger = {};
    }

    if (!req.swagger.document) {
      req.swagger.document = {};
    }

    if (!req.swagger.document.headers) {
      req.swagger.document.headers = [];
    }

    req.swagger.document.headers.push(
      ApiHeader({
        name: 'Content-Type',
        description: 'Request content type',
      }),
      ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
      }),
      ApiHeader({
        name: 'User-Agent',
        description: 'User agent information',
      }),
    );

    // Call the next middleware or route handler
    next();
  }
}
