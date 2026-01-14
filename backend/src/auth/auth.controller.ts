import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('telegram')
  async telegramAuth(@Body('telegramId') telegramId: number) {
    return this.usersService.getOrCreateByTelegram(telegramId);
  }
}
