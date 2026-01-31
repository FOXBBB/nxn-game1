import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async authTelegram(telegramId: string) {
    let user = await this.userRepo.findOne({
      where: { telegramId },
    })

    if (!user) {
      user = this.userRepo.create({
        telegramId,
        balance: 0,
        energy: 100,
        energyMax: 100,
        tapPower: 1,
      })
    } else {
      if (!user.energyMax || user.energyMax <= 0) {
        user.energyMax = 100
      }

      if (user.energy == null || user.energy < 0) {
        user.energy = user.energyMax
      }

      if (!user.tapPower) {
        user.tapPower = 1
      }
    }

    await this.userRepo.save(user)

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
    }
  }
}
