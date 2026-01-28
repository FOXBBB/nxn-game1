import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { startTelegramBot } from './telegram/telegram.bot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log('🚀 Server started on port', port)

  // 🔥 ВАЖНО: запускаем бота ВСЕГДА, если есть токен
  if (process.env.TELEGRAM_BOT_TOKEN) {
    startTelegramBot()
  } else {
    console.log('⚠️ TELEGRAM_BOT_TOKEN not set, bot not started')
  }
}

bootstrap()
