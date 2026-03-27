const API_URL = "http://localhost:8000/api";

export const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items/`);

  if (!res.ok) throw new Error("Ошибка загрузки предметов");

  return res.json();
};

export const addItemToCart = async (itemId) => {
  const token = localStorage.getItem("access");

  if (!token) throw new Error("Не авторизован");

  const res = await fetch(`${API_URL}/cart/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: itemId }),
  });

  if (!res.ok) throw new Error("Ошибка добавления в корзину");

  return res.json();
};