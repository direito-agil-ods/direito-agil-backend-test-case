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
  constructor(private readonly authService: AuthService) {}

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

    const parts = authorizationHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const token = parts[1];

    if (token !== expectedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
