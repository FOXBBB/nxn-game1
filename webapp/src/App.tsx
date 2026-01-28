import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000' 
// ⬆️ для Render потом поменяешь на https://nxn-game1.onrender.com

type TgUser = {
  id: number
  username?: string
  first_name?: string
}

export default function App() {
  const [tgUser, setTgUser] = useState<TgUser | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 1️⃣ Получаем Telegram WebApp
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp

    if (!tg) {
      setError('❌ Открой игру через Telegram')
      setLoading(false)
      return
    }

    tg.ready()
    tg.expand()

    const user = tg.initDataUnsafe?.user

    if (!user) {
      setError('❌ Telegram user не найден')
      setLoading(false)
      return
    }

    setTgUser(user)

    // 2️⃣ Логин / регистрация
    fetch(`${API_URL}/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance)
        setLoading(false)
      })
      .catch(() => {
        setError('❌ Ошибка сервера')
        setLoading(false)
      })
  }, [])

  // 3️⃣ TAP
  const tap = () => {
    if (!tgUser) return

    fetch(`${API_URL}/tap/${tgUser.id}`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance)
      })
  }

  // UI состояния
  if (loading) {
    return (
      <Screen>
        ⏳ Загрузка...
      </Screen>
    )
  }

  if (error) {
    return (
      <Screen>
        {error}
      </Screen>
    )
  }

  return (
    <Screen>
      <h2 style={{ marginBottom: 10 }}>🚀 NEXON TAPALKA</h2>

      <div style={{ marginBottom: 20 }}>
        👤 ID: <b>{tgUser?.id}</b><br />
        💰 Баланс: <b>{balance}</b>
      </div>

      <button
        onClick={tap}
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          fontSize: 22,
          background: '#ffb703',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        TAP
      </button>
    </Screen>
  )
}

// 💄 Обёртка экрана
function Screen({ children }: { children: any }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0f1a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}
