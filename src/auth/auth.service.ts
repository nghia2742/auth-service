/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginPayload, LoginResponse } from './types';
import { authMessage } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, pass: string): Promise<LoginResponse> {
    const user = this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException(authMessage.authentication_failed);
    }

    const payload = {
      username: user.username,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  getProfile(user: LoginPayload) {
    return user;
  }

  validateUser(username: string, pass: string): any {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
