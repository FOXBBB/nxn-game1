import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Injectable()
export class TapService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async tap(telegramId: string) {
    const user = await this.userRepo.findOne({
      where: { telegramId },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    // ⛔ нет энергии — нет тапа
    if (user.energy <= 0) {
      return {
        balance: user.balance,
        energy: user.energy,
        energyMax: user.energyMax,
      }
    }

    // ✅ ТАП
    user.balance += user.tapPower
    user.energy -= 1

    await this.userRepo.save(user)

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
    }
  }
}
