import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Banner from "../components/Banner";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Banner />
      <div className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src="/assets/banner.png"
            alt="Campers and RVs"
            className={styles.bannerImage}
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>
            <Link to="/catalog" className={styles.ctaButton}>
              View Now
            </Link>
          </div>
        </div>
      </div>
      {/* сюди пізніше інші секції */}
    </div>
  );
};

export default HomePage;
