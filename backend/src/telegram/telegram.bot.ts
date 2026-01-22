import { Telegraf } from "telegraf";
import axios from "axios";

export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("❌ TELEGRAM_BOT_TOKEN not set");
    return;
  }

  const bot = new Telegraf(token);
  const BACKEND_URL =
    process.env.BACKEND_URL || "https://nxn-game1.onrender.com";

  bot.start(async (ctx) => {
    const telegramId = ctx.from?.id;
    if (!telegramId) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/telegram`,
        { telegramId }
      );

      await ctx.reply(
        `✅ Добро пожаловать!\n` +
        `ID: ${res.data.id}\n` +
        `Баланс: ${res.data.balance}`
      );
    } catch (e: any) {
      console.error("BOT ERROR:", e?.response?.data || e.message);
      await ctx.reply("❌ Ошибка сервера");
    }
  });

  bot.launch();
  console.log("🤖 Telegram bot started");
}
