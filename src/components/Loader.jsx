import React from "react";
import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.overlay}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
