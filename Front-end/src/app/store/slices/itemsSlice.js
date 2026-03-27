import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "../thunks/itemsThunks";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки";
      });
  },
});

export default itemsSlice.reducer;