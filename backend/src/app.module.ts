import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TapModule } from './tap/tap.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    // 🔥 WEBAPP
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'webapp', 'dist'),
      exclude: ['/api*'],
    }),

    // 🔥 DATABASE
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    TapModule,
    HealthModule,
  ],
})
export class AppModule {}
