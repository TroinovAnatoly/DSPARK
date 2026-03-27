const API_URL = "http://localhost:8000/api";

export const fetchCart = async () => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/cart/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Ошибка загрузки корзины");

  return res.json();
};

export const removeCartItem = async (id) => {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_URL}/cart/remove/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: id }),
  });

  if (!res.ok) throw new Error("Ошибка удаления");

  return res.json();
};

export const buyCart = async () => {
  const token = localStorage.getItem("access");

  const res = await fetch(`${API_URL}/cart/buy/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Ошибка покупки");

  return data;
};