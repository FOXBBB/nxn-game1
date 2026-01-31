import { useEffect, useState } from 'react'

const API_URL = 'https://nxn-game1.onrender.com'

export default function App() {
  const [telegramId, setTelegramId] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [energyMax, setEnergyMax] = useState(0)
  const [tapPower, setTapPower] = useState(1)
  const [error, setError] = useState<string | null>(null)

  // 🔹 Инициализация Telegram
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) {
      setError('Открой через Telegram')
      return
    }

    setTelegramId(String(user.id))
  }, [])

  // 🔥 ПОЛЛИНГ STATE КАЖДЫЕ 3 СЕКУНДЫ
  useEffect(() => {
    if (!telegramId) return

    const loadState = async () => {
      const res = await fetch(`${API_URL}/api/state/${telegramId}`)
      const data = await res.json()

      setBalance(data.balance)
      setEnergy(data.energy)
      setEnergyMax(data.energyMax)
      setTapPower(data.tapPower)
    }

    loadState()
    const interval = setInterval(loadState, 3000)

    return () => clearInterval(interval)
  }, [telegramId])

  // 🔥 TAP
  const tap = async () => {
    if (!telegramId || energy <= 0) return

    const res = await fetch(`${API_URL}/api/tap/${telegramId}`, {
      method: 'POST',
    })

    const data = await res.json()
    setBalance(data.balance)
    setEnergy(data.energy)
  }

  if (error) return <div>{error}</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>NEXON TAPALKA</h2>

      <p>Баланс: <b>{balance}</b></p>
      <p>Энергия: <b>{energy}</b> / {energyMax}</p>

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
