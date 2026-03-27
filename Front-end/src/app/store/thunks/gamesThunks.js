import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async () => {
    const res = await fetch("http://localhost:8000/api/games/");
    if (!res.ok) throw new Error("Ошибка загрузки игр");
    return await res.json();
  }
);