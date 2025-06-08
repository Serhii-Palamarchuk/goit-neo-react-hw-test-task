import React from "react";
import { Link } from "react-router-dom";
import styles from "./Banner.module.css";

const Banner = () => {
  console.log("🔔 Banner rendered");
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1>Rent Your Dream Camper</h1>
        <p>Explore the open road with comfort & style.</p>
        <Link to="/catalog">
          <button className={styles.cta}>View Now</button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
