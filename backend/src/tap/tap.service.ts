import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'

@Injectable()
export class TapService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async tap(telegramId: string) {
    const user = await this.usersRepository.findOne({
      where: { telegramId },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // если энергия закончилась — ничего не делаем
    if (user.energy <= 0) {
      return user
    }

    // списываем энергию
    user.energy -= 1

    // начисляем баланс
    user.balance += user.tapPower

    return this.usersRepository.save(user)
  }
}
