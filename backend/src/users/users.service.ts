import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // ========= БАЗА =========

  async findById(id: number): Promise<User> {
    return this.repo.findOneByOrFail({ id });
  }

  async findByTelegramId(telegramId: number | string): Promise<User | null> {
    return this.repo.findOneBy({
      telegramId: telegramId.toString(),
    });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  // ========= СОЗДАНИЕ =========

  async getOrCreateByTelegram(telegramId: number | string): Promise<User> {
    const tgId = telegramId.toString();

    let user = await this.repo.findOne({
      where: { telegramId: tgId },
    });

    if (!user) {
      user = this.repo.create({
        telegramId: tgId,
        balance: 0,
        balanceNxn: 0,
        tapPower: 1,
        totalTaps: 0,
        energy: 100,
        energyMax: 100,
        tapBonus: 0,
        energyBonus: 0,
        autoClicker: false,
      });

      await this.repo.save(user);
    }

    return user;
  }

  // alias для старого кода
  async createIfNotExists(telegramId: number | string): Promise<User> {
    return this.getOrCreateByTelegram(telegramId);
  }

  // ========= ЛИДЕРБОРД =========

  async getTop10() {
    return this.repo.find({
      order: { balance: "DESC" },
      take: 10,
      select: ["telegramId", "balance"],
    });
  }
}
