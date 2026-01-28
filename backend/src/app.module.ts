import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TapModule } from './tap/tap.module';
import { HealthModule } from './health/health.module';
import { ShopModule } from './shop/shop.module';
import { PaymentsModule } from './payments/payment.module';
import { StateModule } from './state/state.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    // 🔑 ENV
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🌍 WEBAPP (ЭТО ТО, ЧТО ЧИНИТ 404)
    

    // 🗄️ DATABASE (sqlite локально / postgres в prod)
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
    }),

    // 📦 MODULES
    UsersModule,
    AuthModule,
    TapModule,
    HealthModule,
    ShopModule,
    PaymentsModule,
    StateModule,
    LeaderboardModule,
  ],
})
export class AppModule { }
