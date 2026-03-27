import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async () => {
    const token = localStorage.getItem("access");

    const res = await fetch("http://localhost:8000/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  }
);