import { createSlice } from "@reduxjs/toolkit";

// Завантажуємо з localStorage або починаємо з пустого масиву
const persisted = JSON.parse(localStorage.getItem("favoriteIds") || "[]");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: persisted,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const idx = state.indexOf(id);
      if (idx >= 0) {
        // якщо вже є — прибираємо
        state.splice(idx, 1);
      } else {
        // якщо нема — додаємо
        state.push(id);
      }
      // пишемо назад у localStorage
      localStorage.setItem("favoriteIds", JSON.stringify(state));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
