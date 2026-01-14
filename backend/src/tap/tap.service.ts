import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TapService {
  constructor(private readonly users: UsersService) {}

  async tapByTelegramId(telegramId: number) {
    const user = await this.users.findByTelegramId(telegramId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.energy <= 0) {
      return user;
    }

    user.energy -= 1;
    user.balance += user.tapPower;
    user.totalTaps += 1;

    return this.users.save(user);
  }
}
