import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestMetricsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();
    const REQUEST_ID_HEADER = 'x-request-id';

    let requestId = request.header(REQUEST_ID_HEADER);

    if (!requestId) {
      requestId = randomUUID();
    }
    response.setHeader(REQUEST_ID_HEADER, requestId);

    response.on('finish', () => {
      const elapsedMs = Date.now() - startedAt;
      console.log(
        `[${requestId}] ${request.method} ${request.originalUrl} ${response.statusCode} - ${elapsedMs}ms`,
      );
    });

    next();
  }
}
