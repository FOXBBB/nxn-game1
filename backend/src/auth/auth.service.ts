import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  authTelegramWebApp(initData: string) {
    if (!this.checkTelegramAuth(initData)) {
      throw new UnauthorizedException('Invalid Telegram signature');
    }

    const params = new URLSearchParams(initData);
    const user = JSON.parse(params.get('user')!);

    return this.usersService.getOrCreateByTelegram(user.id);
  }

  private checkTelegramAuth(initData: string): boolean {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return false;

    const secret = crypto
      .createHash('sha256')
      .update(token)
      .digest();

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    params.delete('hash');

    const dataCheckString = [...params.entries()]
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    return hmac === hash;
  }
}
