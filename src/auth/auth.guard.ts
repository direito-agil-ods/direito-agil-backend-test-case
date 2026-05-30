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

    const requestTokenTrue = authorizationHeader.startsWith('Bearer');

    if (!requestTokenTrue) {
      throw new UnauthorizedException('Invalid Token format');
    }

    const requestToken = authorizationHeader.split(' ')[1];

    if (requestToken === expectedToken) {
      return true;
    }

    throw new UnauthorizedException('Invalid Token');
  }
}
