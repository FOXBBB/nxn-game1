import { useEffect, useState } from "react";

const API_URL = "https://nxn-game1.onrender.com/api"; // 🔴 ВАЖНО

function App() {
  const [telegramId, setTelegramId] = useState<number | null>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("Telegram WebApp API not found");
      return;
    }

    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (!user) {
      console.error("No Telegram user");
      return;
    }

    console.log("Telegram user:", user.id);
    setTelegramId(user.id);
  }, []);

  const tap = async () => {
    if (!telegramId) return;

    console.log("SEND TAP", telegramId);

    const res = await fetch(`${API_URL}/tap/${telegramId}`, {
      method: "POST",
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (data.balance !== undefined) {
      setBalance(data.balance);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", textAlign: "center" }}>
      <h2>NXN GAME</h2>
      <p>Balance: {balance}</p>

      <button
        onClick={tap}
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "gold",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        TAP
      </button>
    </div>
  );
}

export default App;
