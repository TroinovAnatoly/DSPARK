import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api";

// загрузка заказов
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const token = localStorage.getItem("access");

    const res = await fetch(`${API_URL}/orders/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  }
);