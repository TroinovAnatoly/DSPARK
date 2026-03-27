import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "../thunks/ordersThunks";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders(state) {
      state.orders = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 📦 загрузка заказов
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;