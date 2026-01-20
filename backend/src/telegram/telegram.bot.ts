import { Telegraf } from 'telegraf';
import axios from 'axios';

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error('❌ TELEGRAM_BOT_TOKEN not set');
    return;
  }

  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    const telegramId = ctx.from?.id;
    if (!telegramId) return;

    try {
      const res = await axios.post(
        'https://nxn-game1.onrender.com/api/users/telegram',
        { telegramId },
      );

      await ctx.reply(
        `✅ Добро пожаловать!\nТвой ID: ${res.data.id}\nБаланс: ${res.data.balance}`
      );
    } catch (e) {
      console.error(e);
      await ctx.reply('❌ Ошибка сервера');
    }
  });

  bot.launch();
  console.log('🤖 Telegram bot started');
}
