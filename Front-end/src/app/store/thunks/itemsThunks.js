import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async () => {
    const res = await fetch("http://localhost:8000/api/items/");
    return res.json();
  }
);