import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentWatcherService } from './payment-watcher.service';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]), // 🔥 ВОТ ЭТО БЫЛО ОТСУТСТВУЕТ
    UsersModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentWatcherService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
