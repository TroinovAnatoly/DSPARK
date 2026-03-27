const API_URL = "http://localhost:8000/api";

export const fetchGames = async () => {
  const res = await fetch(`${API_URL}/games/`);

  if (!res.ok) throw new Error("Ошибка загрузки игр");

  return res.json();
};

export const addGameToCart = async (gameId) => {
  const token = localStorage.getItem("access");

  if (!token) throw new Error("Не авторизован");

  const res = await fetch(`${API_URL}/cart/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ game_id: gameId }),
  });

  if (!res.ok) throw new Error("Ошибка добавления в корзину");

  return res.json();
};