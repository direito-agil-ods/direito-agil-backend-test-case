import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestMetricsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();

    // TODO (Task 1): preserve the request id when a client sends x-request-id.
    // TODO (Task 1): generate a UUID when x-request-id is missing.
    const requestId = randomUUID();

    response.setHeader('x-request-id', requestId);

    response.on('finish', () => {
      const elapsedMs = Date.now() - startedAt;
      console.log(
        `[${requestId}] ${request.method} ${request.originalUrl} ${response.statusCode} - ${elapsedMs}ms`,
      );
    });

    next();
  }
}
