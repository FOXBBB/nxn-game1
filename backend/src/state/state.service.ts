import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class StateService {
  constructor(private users: UsersService) {}

  async getState(telegramId: number) {
    const user = await this.users.createIfNotExists(telegramId);

    const now = Date.now();
    const offlineSeconds = Math.floor((now - user.lastSeen) / 1000);

    let earned = 0;

    if (offlineSeconds > 5) {
      const maxSeconds = 6 * 60 * 60; // 6 часов
      const effectiveSeconds = Math.min(offlineSeconds, maxSeconds);

      earned = Math.floor(effectiveSeconds / 3) * user.tapPower;
      user.balance += earned;
      user.offlineIncome = earned;
    } else {
      user.offlineIncome = 0;
    }

    user.lastSeen = now;
    await this.users.save(user);

    return {
      balance: user.balance,
      energy: user.energy,
      tapPower: user.tapPower,
      offlineIncome: earned,
    };
  }
}
