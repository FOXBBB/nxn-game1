import { useEffect, useState } from 'react'

const API_URL = 'https://nxn-game1.onrender.com'

export default function App() {
  const [balance, setBalance] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [maxEnergy, setMaxEnergy] = useState(0)
  const [telegramId, setTelegramId] = useState<string | null>(null)

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) return

    setTelegramId(String(user.id))

    fetch(`${API_URL}/api/auth/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId: String(user.id) }),
    })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance)
        setEnergy(data.energy)
        setMaxEnergy(data.maxEnergy)
      })
  }, [])

  const tap = async () => {
    if (!telegramId) return

    const res = await fetch(`${API_URL}/api/tap/${telegramId}`, {
      method: 'POST',
    })

    const data = await res.json()

    setBalance(data.balance)
    setEnergy(data.energy)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>NEXON TAPALKA</h2>

      <p>💰 Баланс: <b>{balance}</b></p>
      <p>⚡ Энергия: {energy} / {maxEnergy}</p>

      <button
        onClick={tap}
        disabled={energy <= 0}
        style={{
          padding: 20,
          fontSize: 18,
          opacity: energy <= 0 ? 0.5 : 1,
        }}
      >
        TAP
      </button>
    </div>
  )
}
