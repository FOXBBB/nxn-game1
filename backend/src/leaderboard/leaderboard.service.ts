import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getTop10() {
   return this.usersRepo.find({
  order: { balance: "DESC" },
  take: 10,
  select: ["telegramId", "balance", ],
});
  }
}
