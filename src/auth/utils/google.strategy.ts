import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_AUTH_CLIENT_ID', ''),
      clientSecret: configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET', ''),
      callbackURL: configService.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['email', 'profile'], 
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const userDetails = {
      email: profile.emails?.[0].value ?? "",
      name: profile.displayName
    };

    return this.authService.validateUserByGoogle(userDetails);
  }
}
