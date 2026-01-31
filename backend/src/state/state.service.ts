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
    let user = await this.userRepo.findOne({ where: { telegramId } })

    if (!user) {
      user = this.userRepo.create({
        telegramId,
        balance: 0,
        energy: 100,
        energyMax: 100,
        tapPower: 1,
      })
      await this.userRepo.save(user)
    }

    // 🔋 РЕГЕН ЭНЕРГИИ — +1 КАЖДЫЕ 3 СЕК
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
    }
  }
}
