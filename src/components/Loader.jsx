import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ small = false }) => (
  <div className={small ? styles.inlineOverlay : styles.overlay}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
