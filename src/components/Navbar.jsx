import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => (
  <nav className={styles.nav}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Travel</span>
        <span className={styles.logoAccent}>Trucks</span>
      </div>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
