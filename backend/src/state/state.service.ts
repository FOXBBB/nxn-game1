import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getState(telegramId: string) {
    const user = await this.userRepo.findOne({
      where: { telegramId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const now = Date.now()
    const secondsPassed = Math.floor((now - Number(user.lastSeen)) / 1000)

    // ⏱️ каждые 3 секунды +1 энергия
    if (secondsPassed >= 3 && user.energy < user.energyMax) {
      const regen = Math.floor(secondsPassed / 3)

      user.energy = Math.min(
        user.energyMax,
        user.energy + regen,
      )

      user.lastSeen = now
      await this.userRepo.save(user)
    }

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
      tapPower: user.tapPower,
    }
  }
}
