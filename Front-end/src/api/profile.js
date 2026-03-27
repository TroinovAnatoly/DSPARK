const API_URL = "http://localhost:8000/api";

export const fetchProfile = async () => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Ошибка загрузки профиля");

  return res.json();
};

export const fetchOrders = async () => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token");

  const res = await fetch(`${API_URL}/orders/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Ошибка загрузки заказов");

  return res.json();
};