const API_URL = "http://localhost:8000/api";

export const fetchNews = async () => {
  const res = await fetch(`${API_URL}/news/`);

  if (!res.ok) throw new Error("Ошибка загрузки новостей");

  return res.json();
};

export const fetchLastNews = async () => {
  const res = await fetch(`${API_URL}/news/last/`);

  if (!res.ok) throw new Error("Ошибка загрузки последней новости");

  return res.json();
};