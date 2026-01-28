import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { startTelegramBot } from './telegram/telegram.bot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log('🚀 Server started on port', port)

  if (process.env.TELEGRAM_BOT_TOKEN) {
    startTelegramBot()
  }
}

bootstrap()
