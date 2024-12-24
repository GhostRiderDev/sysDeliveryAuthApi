import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../config/Env';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  private readonly googleClient: OAuth2Client;

  constructor() {
    this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body.token;

    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const { email, exp, azp } = payload;
    if (!email) {
      throw new UnauthorizedException('Email not found in token');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && exp < currentTime) {
      throw new UnauthorizedException('Token has expired');
    }

    if (azp !== GOOGLE_CLIENT_ID) {
      throw new UnauthorizedException('Invalid token');
    }

    request.body.email = email;

    return true;
  }
}
