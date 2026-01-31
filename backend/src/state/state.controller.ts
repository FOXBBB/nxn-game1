import { Controller, Get, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Controller('api/state')
export class StateController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Get(':telegramId')
  async getState(@Param('telegramId') telegramId: string) {
    const user = await this.usersRepository.findOne({
      where: { telegramId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      balance: user.balance,
      energy: user.energy,
      energyMax: user.energyMax,
      tapPower: user.tapPower,
    }
  }
}
