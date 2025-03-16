import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { LoginPayload } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.signIn(loginDto.username, loginDto.pass);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() request: Request & { user: LoginPayload }) {
    const user = request.user
    return this.authService.getProfile(user);
  }
}
