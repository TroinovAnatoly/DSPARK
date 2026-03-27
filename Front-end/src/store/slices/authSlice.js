import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/authThunks";

const initialState = {
  user: null,
  token: localStorage.getItem("access") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // загрузка пользователя
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки пользователя";
      });
  },
});

export const { setUser, setToken, logout, clearError } = authSlice.actions;
export default authSlice.reducer;