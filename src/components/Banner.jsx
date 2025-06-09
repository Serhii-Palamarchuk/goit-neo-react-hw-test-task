import React from "react";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link to="/catalog" className={styles.cta}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
