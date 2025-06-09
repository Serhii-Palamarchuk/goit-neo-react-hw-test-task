// src/components/CamperCard.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  MapPin,
  Users,
  Fuel,
  Cog,
  Droplets,
  Wind,
  Coffee,
  Tv,
} from "lucide-react";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import Icon from "./Icon";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((s) => s.favorites.includes(camper.id));

  const formatPrice = (price) => {
    return `€${price.toFixed(2)}`;
  };

  const getBadges = () => {
    const badges = [];

    if (camper.transmission === "automatic") {
      badges.push({
        icon: <Icon name="automatic" size={20} />,
        text: "Automatic",
      });
    }
    if (camper.engine === "petrol") {
      badges.push({ icon: <Icon name="petrol" size={20} />, text: "Petrol" });
    }
    if (camper.engine === "diesel") {
      badges.push({ icon: <Icon name="diesel" size={20} />, text: "Diesel" });
    }
    if (camper.AC) {
      badges.push({ icon: <Icon name="ac" size={20} />, text: "AC" });
    }
    if (camper.bathroom) {
      badges.push({
        icon: <Icon name="bathroom" size={20} />,
        text: "Bathroom",
      });
    }
    if (camper.kitchen) {
      badges.push({ icon: <Icon name="kitchen" size={20} />, text: "Kitchen" });
    }
    if (camper.TV) {
      badges.push({ icon: <Icon name="tv" size={20} />, text: "TV" });
    }
    if (camper.form === "van") {
      badges.push({ icon: <Icon name="van" size={20} />, text: "Van" });
    }
    if (camper.form === "fullyIntegrated") {
      badges.push({
        icon: <Icon name="integrated" size={20} />,
        text: "Fully Integrated",
      });
    }
    if (camper.form === "alcove") {
      badges.push({ icon: <Icon name="alcove" size={20} />, text: "Alcove" });
    }

    return badges.slice(0, 3);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={camper.gallery?.[0]?.thumb || "/placeholder-camper.jpg"}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.priceAndFav}>
            <span className={styles.price}>{formatPrice(camper.price)}</span>
            <button
              type="button"
              className={styles.favButton}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(camper.id));
              }}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                size={24}
                strokeWidth={1.5}
                color={isFavorite ? "#e44848" : "#101828"}
                fill={isFavorite ? "#e44848" : "none"}
              />
            </button>
          </div>
        </div>

        <div className={styles.rating}>
          <div className={styles.ratingGroup}>
            <Star size={16} fill="#ffc531" color="#ffc531" />
            <span className={styles.ratingText}>
              {camper.rating}({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={styles.locationGroup}>
            <MapPin size={16} color="#101828" />
            <span className={styles.locationText}>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>
          {camper.description?.length > 61
            ? `${camper.description.substring(0, 61)}...`
            : camper.description}
        </p>

        <div className={styles.badges}>
          {getBadges().map((badge, index) => (
            <div key={index} className={styles.badge}>
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <Link to={`/catalog/${camper.id}`} className={styles.showButton}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
