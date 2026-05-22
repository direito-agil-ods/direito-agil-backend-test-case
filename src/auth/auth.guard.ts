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

    // TODO (Task 2):
    // 1) Validate "Bearer <token>" format.
    // 2) Compare <token> with expectedToken variable.
    // 3) Allow request only when token is valid.
    throw new UnauthorizedException('Token validation not implemented yet');
  }
}
