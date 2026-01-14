import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class PaymentsService {
  constructor(private users: UsersService) {}

  async confirm(userId: number, amount: number) {
    const user = await this.users.findById(userId);
    user.balanceNxn += amount;
    await this.users.save(user);
    return { ok: true };
  }
}
