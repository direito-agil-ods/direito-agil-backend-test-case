import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DEMO_ACCESS_TOKEN, DEMO_CREDENTIALS } from './auth.constants';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    const isValidUser =
      loginDto.username === DEMO_CREDENTIALS.username &&
      loginDto.password === DEMO_CREDENTIALS.password;

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: DEMO_ACCESS_TOKEN,
      tokenType: 'Bearer',
    };
  }

  getAccessToken(): string {
    return DEMO_ACCESS_TOKEN;
  }
}
