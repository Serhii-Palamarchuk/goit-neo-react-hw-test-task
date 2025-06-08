import React from "react";
import { useSelector } from "react-redux";
import CamperCard from "../components/CamperCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites);
  const campers = useSelector((state) => state.campers.items);
  const favCampers = campers.filter((c) => favorites.includes(c.id));

  return (
    <div className={styles.page}>
      <h2>Your Favorites</h2>
      {favCampers.length > 0 ? (
        <div className={styles.grid}>
          {favCampers.map((c) => (
            <CamperCard key={c.id} camper={c} />
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
