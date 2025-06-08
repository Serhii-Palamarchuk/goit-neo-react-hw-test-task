import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import styles from "./CamperCard.module.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(price);

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites);
  const isFav = favs.includes(camper.id);
  const imageUrl = camper.gallery?.[0]?.thumb || "/assets/placeholder.png";

  const onToggle = () => dispatch(toggleFavorite(camper.id));
  const favClass = isFav
    ? `${styles.favInline} ${styles.favInlineActive}`
    : styles.favInline;

  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageUrl} alt={camper.name} />
      <div className={styles.info}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <button
            className={
              isFav
                ? `${styles.favInline} ${styles.favInlineActive}`
                : styles.favInline
            }
            onClick={onToggle}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>
        <p className={styles.price}>Price: {formatPrice(camper.price)}</p>
        <div className={styles.actions}>
          <Link to={`/catalog/${camper.id}`} target="_blank" rel="noopener">
            <button>Show more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;
