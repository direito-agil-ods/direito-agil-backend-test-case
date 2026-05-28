import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;
    const expectedToken = this.authService.getAccessToken();

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }
    if (!expectedToken) {
      throw new UnauthorizedException('Authentication is not configured');
    }

    const headerParts = authorizationHeader.split(' ');

    if (headerParts.length !== 2 || !headerParts[1]) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const [tokenType, accessToken] = headerParts;

    if (tokenType !== 'Bearer') {
      throw new UnauthorizedException('Invalid token type');
    }

    if (accessToken !== expectedToken) {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;

  }
}
