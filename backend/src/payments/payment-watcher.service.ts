import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentWatcherService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Применяет подтверждённый платёж к пользователю
   * Вызывается из PaymentsService / Controller
   */
  async applyPayment(paymentId: number): Promise<void> {
    const payment = await this.paymentRepo.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      return;
    }

    // если платёж уже обработан — ничего не делаем
    if (payment.status === 'confirmed') {
      return;
    }

    const user = await this.usersService.findById(payment.userId);
    if (!user) {
      return;
    }

    // начисляем баланс
    user.balance += payment.amount;
    await this.usersService.save(user);

    // помечаем платёж как подтверждённый
    payment.status = 'confirmed';
    await this.paymentRepo.save(payment);
  }
}
