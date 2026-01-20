import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("telegram")
  async getOrCreate(@Body() body: { telegramId?: number }) {
    if (!body.telegramId) {
      throw new BadRequestException("telegramId is required");
    }

    return this.usersService.getOrCreateByTelegram(body.telegramId);
  }

}
