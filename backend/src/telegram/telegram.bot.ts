import { Telegraf } from 'telegraf';
import axios from 'axios';

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set');
    return;
  }

  const BACKEND_URL =
    process.env.BACKEND_URL || 'https://nxn-game1.onrender.com';

  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    const telegramId = ctx.from?.id;
    if (!telegramId) {
      await ctx.reply('Не удалось получить Telegram ID 😢');
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/telegram`,
        { telegramId },
        { timeout: 10_000 }
      );

      await ctx.reply(
        `✅ Добро пожаловать!\n` +
        `ID: ${res.data.id}\n` +
        `Баланс: ${res.data.balance}`
      );
    } catch (e: any) {
      console.error(
        'BOT ERROR:',
        e?.response?.data || e.message
      );
      await ctx.reply('❌ Ошибка сервера, попробуй позже');
    }
  });

  bot.launch();
  console.log('🤖 Telegram bot started');
}
