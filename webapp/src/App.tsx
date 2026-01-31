import { useEffect, useState } from 'react'

const API_URL = 'https://nxn-game1.onrender.com/api'

export default function App() {
  const [telegramId, setTelegramId] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [energyMax, setEnergyMax] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // 📌 получаем telegramId
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    const user = tg?.initDataUnsafe?.user

    if (!user) {
      setError('Открой игру через Telegram')
      return
    }

    setTelegramId(String(user.id))

    fetch(`${API_URL}/state/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance)
        setEnergy(data.energy)
        setEnergyMax(data.energyMax)
      })
  }, [])

  // 👆 TAP
  const handleTap = async () => {
    if (!telegramId) return

    const res = await fetch(`${API_URL}/tap/${telegramId}`, {
      method: 'POST',
    })

    const data = await res.json()

    setBalance(data.balance)
    setEnergy(data.energy)
    setEnergyMax(data.energyMax)
  }

  if (error) {
    return <div style={{ padding: 20 }}>{error}</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>NEXON TAPALKA</h2>

      <p>Баланс: <b>{balance}</b></p>
      <p>Энергия: {energy} / {energyMax}</p>

      <button
        onClick={handleTap}
        disabled={energy <= 0}
        style={{ padding: 20, fontSize: 18 }}
      >
        TAP
      </button>
    </div>
  )
}
