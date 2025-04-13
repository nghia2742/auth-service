import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guard';
import { GoogleAuthGuard } from './guard/google.guard';
import { LoginResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Request & { user: LoginResponse }) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request & { user: { email: string } }) {
    const user = req.user
    return this.authService.getProfile(user.email);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  handleGoogleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  handleGoogleRedirect(@Request() req: Request & { user: LoginResponse }) {
    return req.user;
  }
}
