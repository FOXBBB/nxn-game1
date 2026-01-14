import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { TapUpgrade } from './tap-upgrade.entity';

@Injectable()
export class TapUpgradeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(TapUpgrade)
    private readonly upgradeRepo: Repository<TapUpgrade>,
  ) {}

  async buyUpgrade(
    userId: number,
    upgradeKind: 'TAP_PLUS_2' | 'TAP_PLUS_5' | 'TAP_PLUS_10',
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('User not found');

    let value = 0;
    let expiresAt: number | null = null;

    const now = Date.now();
    const DAYS_30 = 30 * 24 * 60 * 60 * 1000;

    if (upgradeKind === 'TAP_PLUS_2') {
      if (user.balanceNxn < 20_000) {
        throw new BadRequestException('Not enough NXN');
      }
      user.balanceNxn -= 20_000;
      value = 2;
      expiresAt = null; // навсегда
    }

    if (upgradeKind === 'TAP_PLUS_5') {
      value = 5;
      expiresAt = now + DAYS_30;
    }

    if (upgradeKind === 'TAP_PLUS_10') {
      value = 10;
      expiresAt = now + DAYS_30;
    }

    if (value === 0) {
      throw new BadRequestException('Invalid upgrade');
    }

    const upgrade = this.upgradeRepo.create({
      user,
      value,
      expiresAt,
    });

    await this.upgradeRepo.save(upgrade);
    await this.userRepo.save(user);

    return { ok: true };
  }
}
