import React from "react";
import { useSelector } from "react-redux";
import CamperCard from "../components/CamperCard";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const favoritesIds = useSelector((s) => s.favorites);
  const campers = useSelector((s) => s.campers.items);

  // 1) Для кожного id шукаємо перший збіг у campers
  // 2) Фільтруємо null і undefined
  const uniqueFavorites = favoritesIds
    .map((id) => campers.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className={styles.wrapper}>
      <h2>Your Favorites</h2>
      {uniqueFavorites.length > 0 ? (
        <div className={styles.catalog}>
          {uniqueFavorites.map((camper) => (
            // тут достатньо key={camper.id}, бо ми вже дали кожному id тільки один раз
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}
