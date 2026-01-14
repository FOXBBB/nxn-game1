import { Controller, Post, Body } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Post("confirm")
  async confirm(@Body() body: { userId: number; amount: number }) {
    return this.payments.confirm(body.userId, body.amount);
  }
}
