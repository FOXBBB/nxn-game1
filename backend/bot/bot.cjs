const TelegramBot = require('node-telegram-bot-api');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// 🔑 ТВОЙ ТОКЕН БОТА
const TOKEN = '8329065405:AAFqRH2_dUWRCPUWskHRdW6trTPFj2EHbcw';

// 🌐 URL фронта (WebApp)
const WEB_APP_URL = 'http://localhost:5173';

// 🌐 Backend API
const API = 'http://localhost:3000';

const bot = new TelegramBot(TOKEN, { polling: true });

console.log('🤖 Bot started');

// ============================
// /start
// ============================
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;

  try {
    // 1️⃣ создаём пользователя (если нет)
    await fetch(`${API}/users/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId })
    });

    // 2️⃣ отправляем кнопку открытия игры
    await bot.sendMessage(chatId, '🚀 Добро пожаловать в NXN Tap Game!', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '▶️ Открыть игру',
              web_app: { url: WEB_APP_URL }
            }
          ]
        ]
      }
    });
  } catch (e) {
    console.error('Start error:', e.message);
    bot.sendMessage(chatId, '❌ Ошибка запуска');
  }
});

// ============================
// fallback
// ============================
bot.on('message', (msg) => {
  if (msg.text && msg.text.startsWith('/')) return;
  bot.sendMessage(msg.chat.id, 'Нажми ▶️ Открыть игру');
});
