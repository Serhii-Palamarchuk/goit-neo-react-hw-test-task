import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Catalog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Favorites
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
