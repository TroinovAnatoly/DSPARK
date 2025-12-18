import React, { useEffect, useState } from "react";

function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function loadCart() {
      const token = localStorage.getItem("access");

      const res = await fetch("http://localhost:8000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setCart(data);
    }

    loadCart();

  }, []);

  async function removeItem(id) {
    const token = localStorage.getItem("access");

    await fetch("http://localhost:8000/api/cart/remove/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ item_id: id })
    });

    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }));

    window.location.reload()
  }

    async function buyCart() {
        const token = localStorage.getItem("access");

        const response = await fetch("http://localhost:8000/api/cart/buy/", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log("BUY RESPONSE:", data);

        if (response.ok) {
            alert("✅ Покупка сохранена!");
            window.location.reload();
        } else {
            alert("❌ Ошибка: " + data.error);
        }
    }



  return (
    <div id="content">
      <h2>Корзина</h2>

      {cart?.items.map(item => (
        <div key={item.id}>
          <p>
            {item.game?.title || item.item?.title} — 
            {item.game?.price || item.item?.price} ₽
          </p>
          <button onClick={() => removeItem(item.id)}>Удалить</button>
        </div>
      ))}

      <h3>Итого: {cart?.total} ₽</h3>

      <button id="buy_button" onClick={buyCart}>Купить</button>
    </div>
  );
}

export default CartPage;
