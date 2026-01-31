import { Controller, Get, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Controller('api/state')
export class StateController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @Get(':telegramId')
  async getState(@Param('telegramId') telegramId: string) {
    const user = await this.userRepo.findOne({
      where: { telegramId },
    })

    if (!user) {
      return {
        balance: 0,
        energy: 0,
        energyMax: 0,
      }
    }

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
    }
  }
}
