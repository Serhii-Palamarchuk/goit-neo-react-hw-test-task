// src/components/CamperCard.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  // Тепер беремо isFavorite по ID з окремого слайсу
  const isFavorite = useSelector((s) => s.favorites.includes(camper.id));

  return (
    <div className={styles.card}>
      <img
        src={camper.gallery?.[0]?.thumb}
        alt={camper.name}
        className={styles.image}
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <button
            type="button"
            className={styles.favButton}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavorite(camper.id));
            }}
            aria-label={isFavorite ? "Remove favorite" : "Add to favorite"}
          >
            <Star
              size={24}
              strokeWidth={2}
              color={isFavorite ? "gold" : "#ccc"}
              fill={isFavorite ? "gold" : "none"}
            />
          </button>
        </div>
        <p className={styles.price}>
          Price:{" "}
          {camper.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className={styles.actions}>
        <Link to={`/catalog/${camper.id}`} className={styles.showButton}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
