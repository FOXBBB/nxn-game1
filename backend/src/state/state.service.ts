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

    // ✅ ПРОСТАЯ РЕГЕНЕРАЦИЯ
    if (user.energy < user.energyMax) {
      user.energy += 1
      if (user.energy > user.energyMax) {
        user.energy = user.energyMax
      }
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
