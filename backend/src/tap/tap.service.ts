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

    if (user.energy <= 0) {
      return {
        balance: user.balance,
        energy: user.energy,
        energyMax: user.energyMax,
      }
    }

    user.balance += user.tapPower
    user.energy -= 1
    user.totalTaps += 1
    user.lastSeen = Date.now()

    await this.userRepo.save(user)

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
    }
  }
}
