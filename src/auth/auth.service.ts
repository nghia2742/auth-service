import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from './utils/hash.util';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async getProfile(email: string) {
    const user = await this.usersService.findOne({ email });
    return user;
  }

  async validateUser(username: string, password: string): Promise<LoginResponse> {
    const user = await this.usersService.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    const validUser = await comparePassword(password, user.password ?? "")
    if (!validUser) {
      throw new UnauthorizedException('Failed to login!');
    }
    const payload = { email: user.email, name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validateUserByGoogle(userDetails: CreateUserDto): Promise<LoginResponse> {
    const user = await this.usersService.findOrCreate(userDetails);

    const payload = { email: user.email, name: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
