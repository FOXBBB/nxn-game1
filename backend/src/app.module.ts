import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { User } from './users/user.entity';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TapModule } from './tap/tap.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // 🔹 БАЗА ДАННЫХ (ОБЯЗАТЕЛЬНО ПЕРЕД МОДУЛЯМИ)
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.sqlite',
      entities: [User],
      synchronize: true,
    }),

    // 🔹 WEBAPP
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'webapp', 'dist'),
      serveRoot: '/',
      exclude: ['/api*'],
    }),

    // 🔹 МОДУЛИ
    AuthModule,
    UsersModule,
    TapModule,
    HealthModule,
  ],
})
export class AppModule {}
