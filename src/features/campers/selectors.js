import { createSelector } from "@reduxjs/toolkit";

// Простий селектор на весь список кемперів
export const selectAllCampers = (state) => state.campers.items;

// Мемоізований селектор для фаворитів
export const selectFavoriteCampers = createSelector(
  [selectAllCampers],
  (campers) => campers.filter((c) => c.isFavorite)
);
