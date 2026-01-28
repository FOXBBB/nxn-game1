import { Telegraf } from 'telegraf'

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN

  if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set')
    return
  }

  const bot = new Telegraf(token)

  bot.start(async (ctx) => {
    await ctx.reply(
      '🚀 NEXON TAPALKA',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🎮 Играть',
                web_app: {
                  url: process.env.WEBAPP_URL || 'https://nxn-game1.onrender.com',
                },
              },
            ],
          ],
        },
      }
    )
  })

  bot.launch()
  console.log('🤖 Telegram bot started')
}
