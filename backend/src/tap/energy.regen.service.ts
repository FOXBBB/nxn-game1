import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class EnergyRegenService {
  constructor(private users: UsersService) {
    setInterval(() => this.tick(), 3000)
  }

  async tick() {
    const users = await this.users.findAll()

    for (const user of users) {
      const max = user.energyMax + user.energyBonus

      if (user.energy < max) {
        user.energy += 1
        if (user.energy > max) user.energy = max
        await this.users.save(user)
      }
    }
  }
}
