import { Injectable } from '@nestjs/common';

@Injectable()
export class TonPaymentService {

  // Генерация payload для инвойса TonConnect
  createInvoice(userId: number, amountTon: number, item: string) {

    return {
      to: "UQDg0qiBTFbmCc6OIaeCSF0tL6eSX8cC56PYTF44Ob8hDqWf",
      value: amountTon,
      comment: `upgrade:${item}:user:${userId}`,
      payload: {
        userId,
        amountTon,
        item,
      },
    };
  }
}
