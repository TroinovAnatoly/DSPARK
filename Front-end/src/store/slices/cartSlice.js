import { createSlice } from "@reduxjs/toolkit";
import { removeCartItem, fetchCart, addItemToCart, buyCart } from "../thunks/cartThunks";

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },

    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // загрузка корзины
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки корзины";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedId = action.payload;

        state.items = state.items.filter((item) => {
          return (
            item.id !== removedId &&
            item.item?.id !== removedId
          );
        });
      })
  },
});

export const { setCart, removeItem, clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;