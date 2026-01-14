import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { TAP_UPGRADES } from "./tap-upgrades";

@Injectable()
export class TapShopService {
  constructor(private users: UsersService) {}

  async buy(userId: number, item: string) {
    const user = await this.users.findById(userId);
    const now = Date.now();

    if (item === "tap") {
      const price =
        TAP_UPGRADES.tap.basePrice *
        Math.pow(TAP_UPGRADES.tap.priceMultiplier, user.tapPower - 1);

      if (user.balance < price)
        throw new BadRequestException("Not enough balance");

      user.balance -= Math.floor(price);
      user.tapPower += TAP_UPGRADES.tap.power;
    }

    else if (item === "energy") {
      const price =
        TAP_UPGRADES.energy.basePrice *
        Math.pow(TAP_UPGRADES.energy.priceMultiplier, (user.energyMax - 100) / 20);

      if (user.balance < price)
        throw new BadRequestException("Not enough balance");

      user.balance -= Math.floor(price);
      user.energyMax += TAP_UPGRADES.energy.add;
      user.energy += TAP_UPGRADES.energy.add;
    }

    else if (item === "autoclicker") {
      if (user.balanceNxn < TAP_UPGRADES.autoclicker.price)
        throw new BadRequestException("Not enough NXN");

      user.balanceNxn -= TAP_UPGRADES.autoclicker.price;
      user.autoClicker = true;
      user.autoClickerExpires =
        Math.max(user.autoClickerExpires ?? 0, now) +
        TAP_UPGRADES.autoclicker.durationMs;
    }

    else {
      throw new BadRequestException("Unknown item");
    }

    await this.users.save(user);

    return {
      balance: user.balance,
      balanceNxn: user.balanceNxn,
      tapPower: user.tapPower,
      energy: user.energy,
      energyMax: user.energyMax,
      autoClicker: user.autoClicker,
    };
  }
}
