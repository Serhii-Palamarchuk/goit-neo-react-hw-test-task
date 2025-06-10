import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.items.findIndex((id) => id === camperId);

      if (index !== -1) {
        // Видаляємо з обраного
        state.items.splice(index, 1);
      } else {
        // Додаємо до обраного
        state.items.push(camperId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
