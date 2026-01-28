import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegramAuth(@Body('initData') initData: string) {
    if (!initData) {
      throw new UnauthorizedException('No initData');
    }

    return this.authService.authTelegramWebApp(initData);
  }
}
