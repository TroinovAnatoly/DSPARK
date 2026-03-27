import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import itemsReducer from "./slices/itemsSlice";
import ordersReducer from "./slices/ordersSlice";
import gamesReducer from "./slices/gamesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    items: itemsReducer,
    games: gamesReducer,
    orders: ordersReducer,
  },
});