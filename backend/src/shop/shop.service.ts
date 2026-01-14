import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

type ShopItem = {
  price: number;
  apply: (user: User) => void;
};

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  private readonly items: Record<string, ShopItem> = {
    tap_2: {
      price: 20_000,
      apply: (u) => {
        u.tapPower += 2;
      },
    },

    energy_100: {
      price: 10_000,
      apply: (u) => {
        u.energyMax += 100;
        u.energy += 100;
      },
    },

    tap_bonus_5_30d: {
      price: 15_000,
      apply: (u) => {
        u.tapBonus += 5;
        u.tapBonusExpires = Date.now() + 30 * 24 * 60 * 60 * 1000;
      },
    },

    auto_30d: {
      price: 50_000,
      apply: (u) => {
        u.autoClicker = true;
        u.autoClickerExpires = Date.now() + 30 * 24 * 60 * 60 * 1000;
      },
    },
  };

  async buy(userId: number, itemKey: string) {
    const item = this.items[itemKey];
    if (!item) {
      throw new BadRequestException('Unknown shop item');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.balanceNxn < item.price) {
      throw new BadRequestException('Not enough NXN');
    }

    user.balanceNxn -= item.price;
    item.apply(user);

    await this.usersRepo.save(user);

    return {
      ok: true,
      state: {
        id: user.id,
        balance: user.balance,
        balanceNxn: user.balanceNxn,
        tapPower: user.tapPower,
        energy: user.energy,
        energyMax: user.energyMax,
        autoClicker: user.autoClicker,
      },
    };
  }
}
