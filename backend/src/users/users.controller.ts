import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post("telegram")
  async getOrCreate(@Body() body: { telegramId: number }) {
    return this.usersService.getOrCreateByTelegram(body.telegramId);
  }

  @Post("avatar")
  async setAvatar(
    @Body() body: { telegramId: number; avatar: string | null },
  ) {
    return this.usersService.setAvatar(body.telegramId, body.avatar);
  }
}
