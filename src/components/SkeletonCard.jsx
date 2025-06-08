import React from "react";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => (
  <div className={styles.card}>
    <div className={styles.image} />
    <div className={styles.header}>
      <div className={styles.title} />
      <div className={styles.star} />
    </div>
    <div className={styles.price} />
    <div className={styles.button} />
  </div>
);

export default SkeletonCard;
