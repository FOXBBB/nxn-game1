import { useEffect, useState } from 'react'

const API_URL = 'https://nxn-game1.onrender.com'

export default function App() {
  const [telegramId, setTelegramId] = useState<number | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) {
      setError('Открой игру через Telegram')
      return
    }

    setTelegramId(user.id)

    fetch(`${API_URL}/api/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance)
      })
      .catch(() => setError('Ошибка сервера'))
  }, [])

  const tap = async () => {
    if (!telegramId) return

    const res = await fetch(`${API_URL}/api/tap/${telegramId}`, {
      method: 'POST',
    })
    const data = await res.json()
    setBalance(data.balance)
  }

  if (error) return <div style={{ padding: 20 }}>{error}</div>
  if (balance === null) return <div style={{ padding: 20 }}>Загрузка…</div>

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>🚀 NEXON TAPALKA</h2>
      <p>Баланс: <b>{balance}</b></p>
      <button
        onClick={tap}
        style={{
          padding: '20px 40px',
          fontSize: 20,
          borderRadius: 100,
          border: 'none',
          background: '#ffd000',
          cursor: 'pointer',
        }}
      >
        TAP
      </button>
    </div>
  )
}
