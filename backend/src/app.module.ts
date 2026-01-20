import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './users/user.entity';
import { Payment } from './payments/payment.entity';
import { TapUpgrade } from './tap/tap-upgrade.entity';
import { StateModule } from './state/state.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payment.module';
import { TapModule } from './tap/tap.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  controllers: [HealthController],
  imports: [
    UsersModule,
    HealthModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ShopModule,
    AuthModule,
    UsersModule,
    PaymentsModule,
    TapModule,
    StateModule,
    LeaderboardModule,
  ],

})
export class AppModule { }
