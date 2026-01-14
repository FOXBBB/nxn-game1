// bot/api.js
const fetch = require('node-fetch');

const API = 'http://localhost:3000/auth/telegram';

async function getOrCreateUser(telegramId) {
  console.log('AUTH telegramId =', telegramId);

  const res = await fetch(`${API}/auth/telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId }),
  });

  const text = await res.text();
  console.log('RESPONSE:', text);

  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}


async function tap(userId) {
  const res = await fetch(`${API}/tap/${userId}`, {
    method: 'POST',
  });

  return res.json();
}

async function getState(userId) {
  const res = await fetch(`${API}/tap/state/${userId}`);
  return res.json();
}

module.exports = {
  getOrCreateUser,
  tap,
  getState,
};
