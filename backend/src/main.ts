import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'
import { join } from 'path'
import { startTelegramBot } from './telegram/telegram.bot'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 🔥 ВАЖНО: реальный путь к webapp/dist
  // process.cwd() сейчас = .../nxn-game1/backend
  const webappPath = join(process.cwd(), '..', 'webapp', 'dist')

  console.log('📦 Serving webapp from:', webappPath)

  // 1) Раздаём статику (JS, CSS, assets)
  app.use(express.static(webappPath))

  // 2) SPA fallback — ВСЕ НЕ-API ЗАПРОСЫ → index.html
  app.getHttpAdapter().get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).send()
    }
    res.sendFile(join(webappPath, 'index.html'))
  })

  await app.listen(3000)
  console.log('🚀 Server started on http://localhost:3000')
}
//startTelegramBot()
bootstrap()
