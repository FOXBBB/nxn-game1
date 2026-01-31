import { useEffect, useState } from 'react'

const API_URL = 'https://nxn-game1.onrender.com'

export default function App() {
  const [telegramId, setTelegramId] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [energyMax, setEnergyMax] = useState(0)

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
  }, [])

  // 🔁 ПОЛЛИНГ ЭНЕРГИИ
  useEffect(() => {
    if (!telegramId) return

    const loadState = async () => {
      const res = await fetch(`${API_URL}/api/state/${telegramId}`)
      const data = await res.json()

      setBalance(data.balance)
      setEnergy(data.energy)
      setEnergyMax(data.energyMax)
    }

    loadState()
    const timer = setInterval(loadState, 3000)

    return () => clearInterval(timer)
  }, [telegramId])

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
      <p>Баланс: {balance}</p>
      <p>Энергия: {energy} / {energyMax}</p>

      <button
        onClick={tap}
        disabled={energy <= 0}
        style={{
          padding: 20,
          fontSize: 18,
          background: energy > 0 ? 'green' : 'gray',
          color: 'white',
        }}
      >
        TAP
      </button>
    </div>
  )
}
