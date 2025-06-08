import { createSlice } from "@reduxjs/toolkit";

// Завантажуємо початковий список з localStorage (якщо є)
const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState, // просто масив id улюблених
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      let next;
      if (state.includes(id)) {
        next = state.filter((item) => item !== id);
      } else {
        next = [...state, id];
      }
      // зберігаємо в localStorage
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
