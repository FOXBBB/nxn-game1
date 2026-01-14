import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AutoClickerService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  @Cron("*/3 * * * * *")
  async tick() {
    const now = Date.now();

    const users = await this.users.find({
      where: { autoClicker: true },
    });

    for (const user of users) {
      if (user.autoClickerExpires && user.autoClickerExpires < now) {
        user.autoClicker = false;
        user.autoClickerExpires = null;
        continue;
      }

      user.balance += user.tapPower + user.tapBonus;
      user.totalTaps += 1;
      await this.users.save(user);
    }
  }
}
