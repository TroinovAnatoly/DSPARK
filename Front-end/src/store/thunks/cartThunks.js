import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const token = localStorage.getItem("access");

    const res = await fetch("http://localhost:8000/api/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  }
);

// добавление товара в корзину
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (itemId, thunkAPI) => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${"http://localhost:8000/api/cart/"}/cart/add/${itemId}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Ошибка добавления");
    }

    return res.json();
  }
);

// покупка корзины
export const buyCart = createAsyncThunk(
  "cart/buyCart",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${"http://localhost:8000/api/cart/"}/cart/buy/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Ошибка покупки");
    }

    return res.json();
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id) => {
    const token = localStorage.getItem("access");

    console.log("DELETE REQUEST ID:", id);

    const res = await fetch(
      `http://localhost:8000/api/cart/remove/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("DELETE RESPONSE STATUS:", res.status);

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    return id;
  }
);